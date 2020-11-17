import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import { fetchDownloads, postDownload, putDownload, deleteDownload } from '../../../downloadService';
import { StandardModal, getThemeColor, StandardButton, StandardTextField, StandardDropDown, StandardIconButton, StandardTooltip } from '../../Utility/Utility';
import { MDBIcon } from "mdbreact";
import { Row, Col, Spin } from 'antd';

const getFileSizeDisplayValue = (fileSize) => {
    const digits = fileSize.toString().length;
    return digits >= 7 ? (fileSize / 1000000) + 'MB' : digits < 7 && digits > 3 ? (fileSize / 1000) + 'KB' : (fileSize) + 'B';
}

function DownloadsTab({ app, userData, style, displayAlert }) {
    const [downloads, setDownloads] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            const { data } = await fetchDownloads(app.id);
            setDownloads(data);
        };
        if (app) {
            fetch();
        }
    }, [app]);

    return (
        <>
            {!downloads && <Spin />}
            {downloads && <DownloadTable displayAlert={displayAlert} downloads={downloads} style={{ margin: 'auto', ...style }} userData={userData} app={app} setDownloads={setDownloads} />}
            {userData?.group === 'Administrator' && <EditDownloads displayAlert={displayAlert} app={app} setMainDownloads={setDownloads} />}
        </>
    );
};

const DownloadTable = ({ style, downloads, userData, app, setDownloads, displayAlert }) => {
    const [sortDir, setSortDir] = useState('desc');
    const CustomTh = ({ children, name }) => {
        const handleSort = async () => {
            if (sortDir === 'desc')
                setSortDir('asc');
            else
                setSortDir('desc');
            const { data } = await fetchDownloads(app.id, name, sortDir);
            setDownloads(data);
        }
        return (
            <th style={{ border: 'none', backgroundColor: getThemeColor(0), fontWeight: 'normal', color: getThemeColor(1) }}>
                <div onClick={handleSort} className='tableHeaderMouseOver'>{children}</div>
            </th>
        );
    };
    return (
        <>
            {downloads?.length === 0 && <div style={{ ...style }}>No downloads found</div>}
            {
                downloads?.length > 0 && <Table size='sm' hover style={{ ...style, color: 'white', backgroundColor: 'transparent' }}>
                    <thead>
                        <tr style={{ fontWeight: 'normal' }}>
                            <CustomTh name='file_name'>Filename</CustomTh>
                            <CustomTh name='file_size'>File Size </CustomTh>
                            <CustomTh name='os_type'>Compatibility</CustomTh>
                            {userData?.group === 'Administrator' && <CustomTh />}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            downloads && downloads.map((download, index) => {
                                return (
                                    <DlRow displayAlert={displayAlert} key={index} download={download} userData={userData} app={app} setDownloads={setDownloads} />
                                )
                            })
                        }
                    </tbody>
                </Table>
            }
        </>
    );
};

const DlRow = ({ download, userData, app, setDownloads, displayAlert }) => {
    const { file_name, file_size, path, download_description, os_type } = download;
    const [modalOpen, setModalOpen] = useState(false);
    const handleDownload = async () => {
        window.open(path);
        setModalOpen(false);
    };
    const DownloadButton = () => {
        return (
            <Row>
                <Col span={12}>
                    <StandardButton onClick={() => setModalOpen(false)}>Cancel</StandardButton>
                </Col>
                <Col span={12}>
                    <StandardButton onClick={handleDownload}>Download</StandardButton>
                </Col>
            </Row>

        );
    };

    const CustomTd = ({ children, style, noOnClick = false }) => {
        return (
            <td style={{ borderTop: `1px solid ${getThemeColor(0.1)}`, verticalAlign: 'middle', ...style }} onClick={() => noOnClick ? () => { } : setModalOpen(true)}>
                {children}
            </td>
        );
    };

    return (
        <>
            <tr className='tableMouseOver' style={{ cursor: 'pointer' }}>
                <CustomTd>{file_name}</CustomTd>
                <CustomTd>{getFileSizeDisplayValue(file_size)}</CustomTd>
                <CustomTd>
                    {os_type === 'Windows' && <StandardTooltip text='Windows'><MDBIcon className='defaultMouseOver' fab icon="windows" /></StandardTooltip>}
                    {os_type === 'Linux' && <StandardTooltip text='Linux'><MDBIcon className='defaultMouseOver' fab icon="linux" /></StandardTooltip>}
                    {os_type === 'Apple' && <StandardTooltip text='Apple'><MDBIcon className='defaultMouseOver' fab icon="apple" /></StandardTooltip>}
                    {os_type === 'Android' && <StandardTooltip text='Android'><MDBIcon className='defaultMouseOver' fab icon="android" /></StandardTooltip>}
                    {os_type === 'All' && <StandardTooltip text='All'><MDBIcon className='defaultMouseOver' far icon="file-alt" /></StandardTooltip>}
                </CustomTd>
                {userData?.group === 'Administrator' && <CustomTd noOnClick><EditDownloads displayAlert={displayAlert} download={download} app={app} setMainDownloads={setDownloads} /></CustomTd>}
            </tr>
            <StandardModal buttons={<DownloadButton />} title='Download File' modalOpen={modalOpen} handleModalClose={() => { setModalOpen(false) }} closable={false}>
                <div style={{ display: 'inline', color: getThemeColor(1) }}>File Name: </div><div style={{ display: 'inline' }}>{file_name}</div>
                <div />
                <div style={{ display: 'inline', color: getThemeColor(1) }}>File Size: </div><div style={{ display: 'inline' }}>{getFileSizeDisplayValue(file_size)}</div>
                <div />
                <div style={{ marginTop: '1vh' }}>{download_description}</div>
            </StandardModal>
        </>
    );
};

const EditDownloads = ({ app, setMainDownloads, download: value, displayAlert }) => {
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
            displayAlert('Successfully deleted download', true);
        }
        else {
            displayAlert('Network error while deleting download', false);
        }
    };

    const handleAddDownload = async () => {
        const { data } = await postDownload(download);
        if (data) {
            setModalOpen(false);
            const { data } = await fetchDownloads(app.id);
            setMainDownloads(data);
            setDownload(blankDownload);
            displayAlert('Successfully saved download', true);
        }
        else {
            displayAlert('Network error while saving download', false);
        }
    };

    const handleEditDownload = async () => {
        const { data } = await putDownload(download);
        if (data) {
            setModalOpen(false);
            const { data } = await fetchDownloads(app.id);
            setMainDownloads(data);
            displayAlert('Successfully saved download', true)
        }
        else {
            displayAlert('Network error while saving download', false);
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
            {value && <StandardIconButton onClick={() => setModalOpen(true)} toolTip='Edit Download' icon={<MDBIcon icon="pencil-alt" />} />}
            {!value && <StandardIconButton onClick={() => setModalOpen(true)} style={{ marginTop: '1vh' }} toolTip='Add Download' icon={<MDBIcon icon="plus" />} />}
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
    const osTypes = [{ id: 'Windows', name: 'Windows' }, { id: 'Linux', name: 'Linux' }, { id: 'Mac', name: 'Mac' }, { id: 'Android', name: 'Android' }, { id: 'All', name: 'All' }];
    return (
        <Form.Group style={{ maxWidth: '95%', padding: '10px', paddingTop: '5px', margin: 'auto' }}>
            <StandardTextField hasError={download?.file_name.length === 0} value={download?.file_name} label='Name' onChange={(e) => setDownload({ ...download, file_name: e.target.value })} />
            <StandardTextField hasError={download?.file_size.length === 0} value={download?.file_size} label='Size' onChange={(e) => setDownload({ ...download, file_size: e.target.value })} />
            <StandardDropDown hasError={download?.os_type === 'Make a selection'} value={download?.os_type} data={osTypes} label='Operating System' onChange={(e) => setDownload({ ...download, os_type: e.target.value })} />
            <StandardTextField hasError={download?.path.length === 0} value={download?.path} label='Path' onChange={(e) => setDownload({ ...download, path: e.target.value })} />
            <StandardTextField hasError={download?.download_description.length === 0} rows={4} value={download?.download_description} label='Description' onChange={(e) => setDownload({ ...download, download_description: e.target.value })} />
        </Form.Group>
    );
};

export default DownloadsTab;
