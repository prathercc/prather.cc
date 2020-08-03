import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import { fetchDownloads, postDownload, putDownload, deleteDownload } from '../../../downloadService';
import { StandardModal, getThemeColor, StandardButton, StandardTextField, StandardDropDown, StandardSpinner, StandardIconButton } from '../../Utility/Utility';
import ModifyIcon from 'react-bootstrap-icons/dist/icons/pencil';
import AddIcon from 'react-bootstrap-icons/dist/icons/file-plus';

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
            {!downloads && <StandardSpinner />}
            {downloads && <DownloadTable displayAlert={displayAlert} downloads={downloads} style={{ margin: 'auto', ...style }} userData={userData} app={app} setDownloads={setDownloads} />}
            {userData && <EditDownloads displayAlert={displayAlert} app={app} setMainDownloads={setDownloads} />}
        </>
    );
};

const DownloadTable = ({ style, downloads, userData, app, setDownloads, displayAlert }) => {
    const CustomTh = ({ children }) => {
        return (
            <th style={{ border: 'none', backgroundColor: getThemeColor(0), fontWeight: 'normal', color: getThemeColor(1) }}>
                {children}
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
                            <CustomTh>Filename</CustomTh>
                            <CustomTh>File Size </CustomTh>
                            <CustomTh>Compatibility</CustomTh>
                            {userData && <CustomTh />}
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
            <StandardButton onClick={handleDownload}>Download</StandardButton>
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
                <CustomTd>{file_size}</CustomTd>
                <CustomTd>{os_type}</CustomTd>
                {userData && <CustomTd noOnClick><EditDownloads displayAlert={displayAlert} download={download} app={app} setMainDownloads={setDownloads} /></CustomTd>}
            </tr>
            <StandardModal buttons={<DownloadButton />} title='Download File' modalOpen={modalOpen} handleModalClose={() => { setModalOpen(false) }} closable={false}>
                <div style={{ display: 'inline', color: getThemeColor(1) }}>File Name: </div><div style={{ display: 'inline' }}>{file_name}</div>
                <div />
                <div style={{ display: 'inline', color: getThemeColor(1) }}>File Size: </div><div style={{ display: 'inline' }}>{file_size}</div>
                <div />
                <div style={{ marginTop: '2vh' }}>{download_description}</div>
            </StandardModal>
        </>
    );
};

const EditDownloads = ({ app, setMainDownloads, download: value, displayAlert }) => {
    const blankDownload = { application_name: app.name, file_name: '', file_size: '', os_type: '', path: '', download_count: 0, software_id: app.id, download_description: '' };
    const [download, setDownload] = useState(value ? value : blankDownload);
    const [modalOpen, setModalOpen] = useState(false);
    const disabledButton = download?.file_name?.length === 0 || download?.os_type?.length === 0 || download?.file_size?.length === 0 || download?.path?.length === 0;

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
        if (!disabledButton) {
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
        }
        else {
            displayAlert('Complete the form and try again', false);
        }
    };

    const handleEditDownload = async () => {
        if (!disabledButton) {
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
        }
        else {
            displayAlert('Complete the form and try again');
        }
    };

    const EditButtons = () => {
        return (
            <Container>
                <Row>
                    <Col><StandardButton onClick={() => handleEditDownload()}>Save</StandardButton></Col>
                    <Col><StandardButton onClick={() => handleDeleteDownload()}>Delete</StandardButton></Col>
                </Row>
            </Container>
        );
    };

    const AddButton = () => {
        return (
            <StandardButton onClick={() => handleAddDownload()}>Save</StandardButton>
        );
    };

    return (
        <>
            {value && <StandardIconButton onClick={() => setModalOpen(true)} toolTip='Edit Download' icon={<ModifyIcon />} />}
            {!value && <StandardIconButton onClick={() => setModalOpen(true)} style={{ marginTop: '1vh' }} toolTip='Add Download' icon={<AddIcon />} />}
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
            <StandardTextField value={download?.file_name} label='Name' onChange={(e) => setDownload({ ...download, file_name: e.target.value })} />
            <StandardTextField value={download?.file_size} label='Size' onChange={(e) => setDownload({ ...download, file_size: e.target.value })} />
            <StandardDropDown value={download?.os_type} data={osTypes} label='Operating System' onChange={(e) => setDownload({ ...download, os_type: e.target.value })} />
            <StandardTextField value={download?.path} label='Path' onChange={(e) => setDownload({ ...download, path: e.target.value })} />
            <StandardTextField rows={4} value={download?.download_description} label='Description' onChange={(e) => setDownload({ ...download, download_description: e.target.value })} />
        </Form.Group>
    );
};

export default DownloadsTab;
