import React, { useState, useEffect } from 'react';
import { fetchDownloads, postDownload, putDownload, deleteDownload } from '../../../downloadService';
import { StandardModal, getThemeColor, StandardButton, StandardIconButton, toggleNotification } from '../../Utility/Utility';
import { Row, Col, Spin, Form, Input, Select, Table } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';

const getFileSizeDisplayValue = (fileSize) => {
    const digits = fileSize?.toString()?.length;
    return digits >= 7 ? (fileSize / 1000000) + 'MB' : digits < 7 && digits > 3 ? (fileSize / 1000) + 'KB' : (fileSize) + 'B';
}

function DownloadsTab({ app, userData, style }) {
    const [downloads, setDownloads] = useState(null);
    const [downloadsLoading, setDownloadsLoading] = useState(true);
    const [selectedDownload, setSelectedDownload] = useState(null);
    useEffect(() => {
        const fetch = async () => {
            try {
                const { data } = await fetchDownloads(app.id);
                setDownloads(data);
            }
            catch (e) {
                console.error('Unable to fetch downloads - ', e);
            }
            finally {
                setDownloadsLoading(false);
            }
        };
        if (app) {
            fetch();
        }
    }, [app]);

    useEffect(() => {
        const assignSize = async (data) => {
            setDownloadsLoading(true);
            const updatedData = data.map(x => (
                {
                    ...x, adjusted_size: getFileSizeDisplayValue(x.file_size), adminEdit: <EditDownloads download={x} app={app} setMainDownloads={setDownloads} />
                }
            ));
            setDownloads(updatedData);
            setDownloadsLoading(false);
        }

        if (downloads?.length > 0 && !downloads[0]?.adjusted_size)
            assignSize(downloads)

    }, downloads);

    const columns = [{
        title: 'Filename', dataIndex: 'file_name', key: 'file_name', align: 'center', sorter: (a, b) => a.file_name.length - b.file_name.length,
        sortDirections: ['descend', 'ascend']
    },
    {
        title: 'Filesize', dataIndex: 'adjusted_size', key: 'file_size', align: 'center', sorter: (a, b) => a.file_size - b.file_size,
        sortDirections: ['descend', 'ascend']
    }];
    const adminColumns = [...columns, { title: 'Actions', dataIndex: 'adminEdit', key: 'adminEdit', align: 'center' }];
    return (
        <>
            {downloadsLoading && <Spin />}
            <Table style={{ padding: '5px', paddingTop: '0px', ...style }} pagination={false} onRow={(record) => { return { onClick: event => { if (event.target.tagName === 'TD') setSelectedDownload(record); } } }} dataSource={downloads} columns={userData?.group === 'Administrator' && adminColumns || columns} />
            {userData?.group === 'Administrator' && <EditDownloads app={app} setMainDownloads={setDownloads} />}
            <DownloadModal selectedDownload={selectedDownload} setSelectedDownload={setSelectedDownload} />
        </>
    );
};

const DownloadModal = ({ selectedDownload, setSelectedDownload }) => {
    const DownloadButton = () => {
        return (
            <Row>
                <Col span={12}>
                    <StandardButton onClick={() => setSelectedDownload(null)}>Cancel</StandardButton>
                </Col>
                <Col span={12}>
                    <StandardButton onClick={handleDownload}>Download</StandardButton>
                </Col>
            </Row>

        );
    };

    const handleDownload = async () => {
        window.open(path);
        setSelectedDownload(null);
    };
    return (
        <>
            <StandardModal width={600} buttons={<DownloadButton />} title='Download File' modalOpen={selectedDownload !== null} handleModalClose={() => setSelectedDownload(null)} closable={false}>
                <div style={{ display: 'inline', color: getThemeColor(1) }}>File Name: </div><div style={{ display: 'inline' }}>{selectedDownload?.file_name}</div>
                <div />
                <div style={{ display: 'inline', color: getThemeColor(1) }}>File Size: </div><div style={{ display: 'inline' }}>{getFileSizeDisplayValue(selectedDownload?.file_size)}</div>
                <div />
                <div style={{ display: 'inline', color: getThemeColor(1) }}>Campatibility: </div><div style={{ display: 'inline' }}>{selectedDownload?.os_type}</div>
                <div />
                <div style={{ marginTop: '1vh' }}>{selectedDownload?.download_description}</div>
            </StandardModal>
        </>
    )
}

const EditDownloads = ({ app, setMainDownloads, download: value }) => {
    const blankDownload = { application_name: app.name, file_name: '', file_size: '', os_type: '', path: '', download_count: 0, software_id: app.id, download_description: '' };
    const [download, setDownload] = useState(value ? value : blankDownload);
    const [modalOpen, setModalOpen] = useState(false);
    const disabledButton = download.file_name.length === 0 || download.os_type.length === 0 || download.os_type === 'Make a selection'
        || download.file_size.length === 0 || download.path.length === 0 || download.download_description.length === 0;
    const handleDeleteDownload = async () => {
        const { data } = await deleteDownload(download.id);
        if (data) {
            setModalOpen(false);
            const { data } = await fetchDownloads(app.id);
            setMainDownloads(data);
            toggleNotification('success', 'Success', 'Successfully deleted download!');
        }
        else {
            toggleNotification('error', 'Failure', 'Failed to delete download!');
        }
    };

    const handleAddDownload = async () => {
        const { data } = await postDownload(download);
        if (data) {
            setModalOpen(false);
            const { data } = await fetchDownloads(app.id);
            setMainDownloads(data);
            setDownload(blankDownload);
            toggleNotification('success', 'Success', 'Successfully created download!');
        }
        else {
            toggleNotification('error', 'Failure', 'Failed to create download!');
        }
    };

    const handleEditDownload = async () => {
        const { data } = await putDownload(download);
        if (data) {
            setModalOpen(false);
            const { data } = await fetchDownloads(app.id);
            setMainDownloads(data);
            toggleNotification('success', 'Success', 'Successfully saved download!');
        }
        else {
            toggleNotification('error', 'Failure', 'Failed to save download!');
        }
    };

    const EditButtons = () => {
        return (
            <Row>
                <Col span={8}>
                    <StandardButton onClick={() => setModalOpen(false)}>Cancel</StandardButton>
                </Col>
                <Col span={8}>
                    <StandardButton onClick={handleDeleteDownload}>Delete</StandardButton>
                </Col>
                <Col span={8}>
                    <StandardButton disabled={disabledButton} onClick={handleEditDownload}>Save</StandardButton>
                </Col>
            </Row>
        );
    };

    const AddButton = () => {
        return (
            <Row>
                <Col span={12}>
                    <StandardButton onClick={() => setModalOpen(false)}>Cancel</StandardButton>
                </Col>
                <Col span={12}>
                    <StandardButton disabled={disabledButton} onClick={() => handleAddDownload()}>Save</StandardButton>
                </Col>
            </Row>
        );
    };

    return (
        <>
            {value && <StandardIconButton onClick={() => setModalOpen(true)} toolTip='Edit Download' icon={<EditOutlined />} />}
            {!value && <StandardIconButton onClick={() => setModalOpen(true)} style={{ marginTop: '1vh' }} toolTip='Add Download' icon={<PlusOutlined />} />}
            <StandardModal
                title={`Download Alteration - ${value ? 'Modify' : 'Create'}`}
                modalOpen={modalOpen}
                handleModalClose={() => setModalOpen(false)}
                buttons={value ? <EditButtons /> : <AddButton />}
            >
                <Download download={download} app={app} setDownload={setDownload} />
            </StandardModal>
        </>
    );
};

const Download = ({ download, setDownload }) => {
    const osTypes = ['Windows', 'Linux', 'Mac', 'Android', 'All'];
    const [form] = Form.useForm();
    return (
        <Form initialValues={{ ...download }} onValuesChange={(e) => setDownload({ ...download, ...e })} form={form} layout='vertical'>
            <Form.Item name='file_name' label='Name'>
                <Input placeholder='Type a file name' />
            </Form.Item>
            <Form.Item name='file_size' label='Size'>
                <Input placeholder='Type a file size' />
            </Form.Item>
            <Form.Item name='os_type' label='Operating System'>
                <Select placeholder='Select an operating system' onChange={(e) => form.setFieldsValue({ ...form.getFieldsValue(), os_type: e })}>
                    {osTypes.map((os, i) => {
                        return (
                            <Select.Option key={i} value={os}>{os}</Select.Option>
                        )
                    })}
                </Select>
            </Form.Item>
            <Form.Item name='path' label='Path'>
                <Input placeholder='Type a URL' />
            </Form.Item>
            <Form.Item name='download_description' label='Description'>
                <Input.TextArea rows={4} placeholder='Type a description' />
            </Form.Item>
        </Form>
    );
};

export default DownloadsTab;
