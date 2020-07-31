import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import { fetchDownloads, postDownload, putDownload, deleteDownload } from '../../../downloadService';
import { StandardModal, getThemeColor, StandardButton, StandardTextField, StandardDropDown, StandardSpinner, StandardIconButton } from '../../Utility/Utility';
import AllIcon from 'react-bootstrap-icons/dist/icons/file-earmark';
import ExecutableIcon from 'react-bootstrap-icons/dist/icons/window';
import ModifyIcon from 'react-bootstrap-icons/dist/icons/pencil';
import AddIcon from 'react-bootstrap-icons/dist/icons/plus-circle';

function DownloadsTab({ app, userData, style }) {
    const [downloads, setDownloads] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            await fetchDownloads(app.id, setDownloads);
        };
        if (app) {
            fetch();
        }
    }, [app]);

    return (
        <>
            {!downloads && <StandardSpinner />}
            {downloads && <DownloadTable downloads={downloads} style={{ margin: 'auto', ...style }} userData={userData} app={app} setDownloads={setDownloads} />}
            {userData && <EditDownloads app={app} setMainDownloads={setDownloads} />}
        </>
    );
}

const DownloadTable = ({ style, downloads, userData, app, setDownloads }) => {
    const CustomTh = ({ children }) => {
        return (
            <th style={{ border: 'none', backgroundColor: getThemeColor(0), fontWeight: 'normal', color: getThemeColor(1) }}>
                {children}
            </th>
        )
    }
    return (
        <>
            {downloads?.length === 0 && <div style={{ ...style }}>No downloads found</div>}
            {
                downloads?.length > 0 && <Table size='sm' hover style={{ ...style, color: 'white', backgroundColor: 'transparent' }}>
                    <thead>
                        <tr style={{ fontWeight: 'normal' }}>
                            <CustomTh>Filename</CustomTh>
                            <CustomTh>Type</CustomTh>
                            <CustomTh>File Size </CustomTh>
                            <CustomTh>Compatibility</CustomTh>
                            {userData && <CustomTh />}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            downloads && downloads.map((download, index) => {
                                return (
                                    <DlRow key={index} download={download} userData={userData} app={app} setDownloads={setDownloads} />
                                )
                            })
                        }
                    </tbody>
                </Table>
            }
        </>
    )
}

const DlRow = ({ download, userData, app, setDownloads }) => {
    const { file_name, file_size, path, download_description, os_type } = download;
    const [modalOpen, setModalOpen] = useState(false);
    const handleDownload = async () => {
        window.open(path);
        setModalOpen(false);
    };
    const DownloadButton = <StandardButton onClick={handleDownload}>Download</StandardButton>

    const CustomTd = ({ children, style, noOnClick = false }) => {
        return (
            <td style={{ borderTop: `1px solid ${getThemeColor(0.1)}`, verticalAlign: 'middle', ...style }} onClick={() => noOnClick ? () => { } : setModalOpen(true)}>
                {children}
            </td>
        )
    };
    const Icon = ({ type }) => {
        return (
            <>
                {type === 'All' && <StandardIconButton isActive={false} toolTip='Resource' icon={<AllIcon />} />}
                {type !== 'All' && <StandardIconButton isActive={false} toolTip='Executable' icon={<ExecutableIcon />} />}
            </>
        )
    };
    return (
        <>
            <tr className='tableMouseOver' style={{ cursor: 'pointer' }}>
                <CustomTd>{file_name}</CustomTd>
                <CustomTd>{<Icon type={os_type} />}</CustomTd>
                <CustomTd>{file_size}</CustomTd>
                <CustomTd>{os_type}</CustomTd>
                {userData && <CustomTd noOnClick><EditDownloads download={download} app={app} setMainDownloads={setDownloads} /></CustomTd>}
            </tr>
            <StandardModal buttons={DownloadButton} title='Download File' modalOpen={modalOpen} handleModalClose={() => { setModalOpen(false) }} closable={false}>
                <div style={{ display: 'inline', color: getThemeColor(1) }}>File Name: </div><div style={{ display: 'inline' }}>{file_name}</div>
                <div />
                <div style={{ display: 'inline', color: getThemeColor(1) }}>File Size: </div><div style={{ display: 'inline' }}>{file_size}</div>
                <div />
                <div style={{ marginTop: '2vh' }}>{download_description}</div>
            </StandardModal>
        </>
    )
}

const EditDownloads = ({ app, setMainDownloads, download: value }) => {
    const blankDownload = { application_name: app.name, file_name: '', file_size: '', os_type: '', path: '', download_count: 0, software_id: app.id, download_description: '' };
    const [download, setDownload] = useState(value ? value : blankDownload);
    const [modalOpen, setModalOpen] = useState(false);
    const disabledButton = download?.file_name?.length === 0 || download?.os_type?.length === 0 || download?.file_size?.length === 0 || download?.path?.length === 0;

    const handleDeleteDownload = async () => {
        await deleteDownload(download.id);
        setModalOpen(false);
        await fetchDownloads(app.id, setMainDownloads);
    };

    const handleAddDownload = async () => {
        await postDownload(download);
        setModalOpen(false);
        await fetchDownloads(app.id, setMainDownloads);
        setDownload(blankDownload);
    };

    const handleEditDownload = async () => {
        await putDownload(download);
        setModalOpen(false);
        await fetchDownloads(app.id, setMainDownloads);
    };

    const EditButtons = () => {
        return (
            <Row>
                <Col><StandardButton isActive={!disabledButton} onClick={() => handleEditDownload()}>Save</StandardButton></Col>
                <Col><StandardButton onClick={() => handleDeleteDownload()}>Delete</StandardButton></Col>
            </Row>
        )
    }

    const AddButton = () => {
        return (
            <StandardButton isActive={!disabledButton} onClick={() => handleAddDownload()}>Add</StandardButton>
        )
    }

    return (
        <>
            {value && <StandardIconButton onClick={() => setModalOpen(true)} toolTip='Edit Download' icon={<ModifyIcon />} />}
            {!value && <StandardIconButton onClick={() => setModalOpen(true)} style={{ marginTop: '2vh' }} toolTip='Add Download' icon={<AddIcon />} />}
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
        <Form.Group style={{ minWidth: '95%', padding: '10px', paddingTop: '5px' }}>
            <StandardTextField value={download?.file_name} label='Name' onChange={(e) => setDownload({ ...download, file_name: e.target.value })} />
            <StandardTextField value={download?.file_size} label='Size' onChange={(e) => setDownload({ ...download, file_size: e.target.value })} />
            <StandardDropDown value={download?.os_type} data={osTypes} label='Operating System' onChange={(e) => setDownload({ ...download, os_type: e.target.value })} />
            <StandardTextField value={download?.path} label='Path' onChange={(e) => setDownload({ ...download, path: e.target.value })} />
            <StandardTextField value={download?.download_description} label='Description' onChange={(e) => setDownload({ ...download, download_description: e.target.value })} />
        </Form.Group>
    );
};

export default DownloadsTab;
