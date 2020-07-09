import React, { useContext, useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import Table from 'react-bootstrap/Table';
import { AppContext } from '../../../AppContext';
import { fetchDownloads, postDownload, putDownload, deleteDownload } from '../../../downloadService';
import { StandardModal, getThemeColor, StandardButton, StandardTextField, StandardDropDown, getIconSizing } from '../../Utility/Utility';
import DemoIcon from 'react-bootstrap-icons/dist/icons/file-earmark-diff';
import ApplicationIcon from 'react-bootstrap-icons/dist/icons/gear-wide-connected';
import ModifyIcon from 'react-bootstrap-icons/dist/icons/pencil';
import AddIcon from 'react-bootstrap-icons/dist/icons/plus-circle';

function DownloadsTab({ app, userData, style }) {
    const [downloads, setDownloads] = useState(null);

    const ConfiguredTable = ({ type }) => {
        return (
            <DownloadTable type={type} downloads={downloads} style={{ margin: 'auto', marginTop: '1vh' }} userData={userData} app={app} setDownloads={setDownloads} />
        );
    };

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
            <Tab.Container style={{ ...style }} defaultActiveKey='Windows'>
                <DownloadSwitcher />
                <Tab.Content>
                    <Tab.Pane eventKey='Windows'>
                        <ConfiguredTable type='Windows' />
                    </Tab.Pane>
                    <Tab.Pane eventKey='Linux'>
                        <ConfiguredTable type='Linux' />
                    </Tab.Pane>
                    <Tab.Pane eventKey='Mac'>
                        <ConfiguredTable type='Mac' />
                    </Tab.Pane>
                    <Tab.Pane eventKey='Android'>
                        <ConfiguredTable type='Android' />
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
            {userData && <EditDownloads app={app} setMainDownloads={setDownloads} />}
        </>
    );
}

const DownloadTable = ({ style, downloads, type, userData, app, setDownloads }) => {
    const [filteredDownloads, setFilteredDownloads] = useState([]);
    const appSettings = useContext(AppContext);
    const { fgColorDetail } = appSettings;

    useEffect(() => {
        const filterDownloads = () => {
            let resources = downloads?.filter(x => x.os_type === 'Resource');
            let arr = downloads?.filter(x => x.os_type === type);
            setFilteredDownloads(arr?.length > 0 ? [...arr, ...resources] : []);
        }
        filterDownloads();
    }, []);

    return (
        <>
            {filteredDownloads?.length === 0 && <div style={{ marginTop: '1vh' }}>No downloads found</div>}
            {
                filteredDownloads?.length > 0 && <Table size='sm' hover style={{ ...style, color: 'white', backgroundColor: fgColorDetail, border: `1px solid ${getThemeColor(0.1)}`, maxWidth: '85%' }}>
                    <thead>
                        <tr>
                            <th style={{ border: `1px solid ${getThemeColor(0.1)}` }}>
                                Filename
                            </th>
                            <th style={{ border: `1px solid ${getThemeColor(0.1)}` }}>
                                Type
                            </th>
                            <th style={{ border: `1px solid ${getThemeColor(0.1)}` }}>
                                File Size
                            </th>
                            {userData && <th style={{ border: `1px solid ${getThemeColor(0.1)}` }}></th>}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredDownloads && filteredDownloads.map((download, index) => {
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
    const DownloadButton = <StandardButton onClick={handleDownload} style={{ minWidth: '25%' }}>Download</StandardButton>

    const CustomTd = ({ children, style, noOnClick = false }) => {
        return (
            <td style={{ borderTop: `1px solid ${getThemeColor(0.1)}`, ...style }} onClick={() => noOnClick ? () => { } : setModalOpen(true)}>
                {children}
            </td>
        )
    }
    return (
        <>
            <tr className='defaultMouseOver' style={{ cursor: 'pointer' }}>
                <CustomTd>{file_name}</CustomTd>
                <CustomTd>{<Icon type={os_type} />}</CustomTd>
                <CustomTd>{file_size}</CustomTd>
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

const DownloadSwitcher = () => {
    const BlankKeys = { Windows: false, Linux: false, Mac: false, Android: false }
    const [activeKey, setActiveKey] = useState({ ...BlankKeys, Windows: true });

    const CustomLink = ({ keyBool, keyText, displayText, style, className }) => {
        return (
            <span className={keyBool || 'defaultMouseOver'}>
                <Nav.Link className={className} as={'div'} style={keyBool ? { backgroundColor: getThemeColor(1), color: 'black', cursor: 'pointer', outline: 0, ...style } : { cursor: 'pointer', outline: 0, backgroundColor: getThemeColor(0.3), ...style }} onClick={() => setActiveKey({ ...BlankKeys, [keyText]: true })} eventKey={keyText}>{displayText}</Nav.Link>
            </span>
        )
    };

    return (
        <Nav style={{ margin: 'auto', maxWidth: 'max-content', marginTop: '1vh' }} defaultActiveKey='Windows'>
            <Nav.Item>
                <CustomLink className='tabsLeftBorderRadius' keyBool={activeKey.Windows} keyText='Windows' displayText='Windows' />
            </Nav.Item>
            <Nav.Item className='tabsLeftBorderBlack'>
                <CustomLink keyBool={activeKey.Linux} keyText='Linux' displayText='Linux' />
            </Nav.Item>
            <Nav.Item className='tabsLeftBorderBlack'>
                <CustomLink keyBool={activeKey.Mac} keyText='Mac' displayText='Mac' />
            </Nav.Item>
            <Nav.Item className='tabsLeftBorderBlack'>
                <CustomLink className='tabsRightBorderRadius' keyBool={activeKey.Android} keyText='Android' displayText='Android' />
            </Nav.Item>
        </Nav>
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
                <Col>
                    <StandardButton isActive={!disabledButton} onClick={() => handleEditDownload()}>Save</StandardButton>
                </Col>
                <Col>
                    <StandardButton onClick={() => handleDeleteDownload()}>Delete</StandardButton>
                </Col>
            </Row>
        );
    };

    const AddButton = () => {
        return (
            <StandardButton isActive={!disabledButton} onClick={() => handleAddDownload()}>Add</StandardButton>
        );
    };


    return (
        <>
            <StandardButton icon={value ? <ModifyIcon style={{ fontSize: getIconSizing('small') }} /> : <AddIcon style={{ fontSize: getIconSizing('small'), marginTop: '1vh' }} />} onClick={() => setModalOpen(true)} />
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
    const osTypes = [{ id: 'Windows', name: 'Windows' }, { id: 'Linux', name: 'Linux' }, { id: 'Mac', name: 'Mac' }, { id: 'Android', name: 'Android' }, { id: 'Resource', name: 'Resource' }];
    return (
        <Form.Group style={{ minWidth: '95%', outline: `1px solid ${getThemeColor(0.2)}`, padding: '10px', paddingTop: '5px' }}>
            <StandardTextField value={download?.file_name} label='Name' onChange={(e) => setDownload({ ...download, file_name: e.target.value })} />
            <StandardTextField value={download?.file_size} label='Size' onChange={(e) => setDownload({ ...download, file_size: e.target.value })} />
            <StandardDropDown value={download?.os_type} data={osTypes} label='Operating System' onChange={(e) => setDownload({ ...download, os_type: e.target.value })} />
            <StandardTextField value={download?.path} label='Path' onChange={(e) => setDownload({ ...download, path: e.target.value })} />
            <StandardTextField value={download?.download_description} label='Description' onChange={(e) => setDownload({ ...download, download_description: e.target.value })} />
        </Form.Group>
    );
};

const Icon = ({ type }) => {
    return (
        <>
            {type === 'Resource' && <DemoIcon style={{ color: getThemeColor(1) }} />}
            {type !== 'Resource' && <ApplicationIcon style={{ color: getThemeColor(1) }} />}
        </>
    )
}

export default DownloadsTab;
