import React, { useContext, useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import Table from 'react-bootstrap/Table';
import { AppContext } from '../../../AppContext';
import { fetchDownloads, postDownload, putDownload, deleteDownload, incrementDownload } from '../../../downloadService';
import { StandardCard, StandardModal, getThemeColor, StandardSpinner, StandardButton, StandardTextField, StandardDropDown } from '../../Utility/Utility';

function SoftwareCompatibility({ app, userData, style }) {
  const [downloads, setDownloads] = useState(null);

  const ConfiguredTable = ({ type }) => {
    return (
      <DownloadTable app={app} setDownloads={setDownloads} type={type} downloads={downloads} style={{ marginTop: '1vh' }} />
    );
  };

  useEffect(() => {
    const fetch = async () => {
      await fetchDownloads(app.id, setDownloads);
    };
    if (app !== null) {
      fetch();
    }
  }, []);

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
      {userData && <EditDownloads style={{ marginTop: '1vh' }} app={app} setMainDownloads={setDownloads} />}
    </>
  );
}

const DownloadTable = ({ style, downloads, type, app, setDownloads }) => {
  const [filteredDownloads, setFilteredDownloads] = useState([]);
  useEffect(() => {
    const filterDownloads = () => {
      let arr = downloads?.filter(x => x.os_type === type);
      setFilteredDownloads(arr);
    }
    filterDownloads();
  }, []);

  return (
    <>
      {filteredDownloads?.length === 0 && <div style={{ marginTop: '1vh' }}>No downloads found</div>}
      {
        filteredDownloads?.length > 0 && <Table size='sm' hover style={{ ...style, color: 'white', backgroundColor: getThemeColor(0.025), border: `1px solid ${getThemeColor(0.5)}` }}>
          <thead>
            <tr>
              <th style={{ border: `1px solid ${getThemeColor(0.5)}` }}>
                Filename
              </th>
              <th style={{ border: `1px solid ${getThemeColor(0.5)}` }}>
                File Size
             </th>
              <th style={{ border: `1px solid ${getThemeColor(0.5)}` }}>
                Downloads
             </th>
            </tr>
          </thead>
          <tbody>
            {
              filteredDownloads && filteredDownloads.map((download, index) => {
                return (
                  <DlRow setDownloads={setDownloads} app={app} key={index} download={download} />
                )
              })
            }
          </tbody>
        </Table>
      }
    </>
  )
}

const DlRow = ({ download: { file_name, file_size, download_count, id, path }, app, setDownloads }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const handleDownload = async () => {
    await incrementDownload(id);
    await fetchDownloads(app.id, setDownloads);
    window.open(path);
    setModalOpen(false);
  };
  const DownloadButton = <StandardButton onClick={handleDownload} style={{ minWidth: '25%' }}>Download</StandardButton>

  return (
    <>
      <tr onClick={() => setModalOpen(true)} className='defaultMouseOver' style={{ cursor: 'pointer' }}>
        <td style={{ borderTop: `1px solid ${getThemeColor(0.2)}` }}>{file_name}</td>
        <td style={{ borderTop: `1px solid ${getThemeColor(0.2)}` }}>{file_size}</td>
        <td style={{ borderTop: `1px solid ${getThemeColor(0.2)}` }}>{download_count}</td>
      </tr>
      <StandardModal buttons={DownloadButton} title='' modalOpen={modalOpen} handleModalClose={() => { setModalOpen(false) }} closable={false}>
        <div style={{ display: 'inline', color: getThemeColor(1) }}>File Name: </div><div style={{ display: 'inline' }}>{file_name}</div>
        <div />
        <div style={{ display: 'inline', color: getThemeColor(1) }}>File Size: </div><div style={{ display: 'inline' }}>{file_size}</div>
        <div />
        <div style={{ display: 'inline', color: getThemeColor(1) }}>Downloads: </div><div style={{ display: 'inline' }}>{download_count}</div>
      </StandardModal>
    </>
  )
}

const DownloadSwitcher = () => {
  const BlankKeys = { Windows: false, Linux: false, Mac: false, Android: false }
  const [activeKey, setActiveKey] = useState({ ...BlankKeys, Windows: true });

  const CustomLink = ({ keyBool, keyText, displayText }) => {
    return (
      <Nav.Link className={keyBool || 'defaultMouseOver'} style={keyBool ? { backgroundColor: getThemeColor(1), color: 'black' } : {}} onClick={() => setActiveKey({ ...BlankKeys, [keyText]: true })} eventKey={keyText}>{displayText}</Nav.Link>
    )
  }

  return (
    <StandardCard style={{ maxWidth: 'max-content', margin: 'auto' }}>
      <Nav defaultActiveKey='Windows'>
        <Nav.Item>
          <CustomLink keyBool={activeKey.Windows} keyText='Windows' displayText='Windows' />
        </Nav.Item>
        <Nav.Item>
          <CustomLink keyBool={activeKey.Linux} keyText='Linux' displayText='Linux' />
        </Nav.Item>
        <Nav.Item>
          <CustomLink keyBool={activeKey.Mac} keyText='Mac' displayText='Mac' />
        </Nav.Item>
        <Nav.Item>
          <CustomLink keyBool={activeKey.Android} keyText='Android' displayText='Android' />
        </Nav.Item>
      </Nav>
    </StandardCard>
  )
}

const EditDownloads = ({ app, setMainDownloads, style }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [downloads, setDownloads] = useState(null);
  const [downloadsLoading, setDownloadsLoading] = useState(true);
  const appSettings = useContext(AppContext);
  const { softwareFontSize } = appSettings;

  const handleModalClose = async () => {
    setModalOpen(false);
    setDownloadsLoading(true);
    await fetchDownloads(app.id, setMainDownloads);
  };

  const openAndLoadDownloads = async () => {
    setModalOpen(true);
    await fetchDownloads(app.id, setDownloads);
  };

  useEffect(() => {
    if (downloads !== null) {
      setDownloadsLoading(false);
    }
    console.log(downloads)
  }, [downloads]);

  return (
    <>
      <StandardButton style={{ ...style, fontSize: softwareFontSize }} onClick={() => openAndLoadDownloads()} variant='warning' block>
        Modify {app.name} Downloads
      </StandardButton>
      <StandardModal
        title='Modify Downloads'
        modalOpen={modalOpen}
        handleModalClose={handleModalClose}
      >
        {downloadsLoading && <StandardSpinner />}
        <Download app={app} reloadDownloads={openAndLoadDownloads} />
        {!downloadsLoading && downloads.map((download) => {
          return (
            <Download
              key={download.id}
              download={download}
              app={app}
              reloadDownloads={openAndLoadDownloads}
            />
          );
        })}
      </StandardModal>
    </>
  );
};

const Download = ({ app, download: value, reloadDownloads }) => {
  const blankDownload = { application_name: app.name, file_name: '', file_size: '', os_type: '', path: '', download_count: 0, software_id: app.id }
  const [download, setDownload] = useState(value ? value : blankDownload);
  let disabledButton = download?.file_name?.length === 0 || download?.os_type?.length === 0 || download?.file_size?.length === 0 || download?.path?.length === 0;
  const osTypes = [{ id: 'Windows', name: 'Windows' }, { id: 'Linux', name: 'Linux' }, { id: 'Mac', name: 'Mac' }, { id: 'Android', name: 'Android' }, { id: 'Resource', name: 'Resource' }];

  const handleDeleteDownload = async () => {
    await deleteDownload(download.id);
    reloadDownloads();
  };

  const handleAddDownload = async () => {
    await postDownload(download);
    reloadDownloads();
    setDownload(blankDownload);
  };

  const handleEditDownload = async () => {
    await putDownload(download);
    reloadDownloads();
  };

  return (
    <>
      <StandardCard title={value !== undefined ? 'Edit Existing Download' : 'Create New Download'} style={{ border: `1px solid ${getThemeColor(0.5)}`, marginBottom: '1vh', padding: '1vh' }}>
        <Form.Group style={{ minWidth: '95%' }}>
          <Container>
            <Row>
              <Col>
                <StandardTextField value={download?.file_name} label='Name' onChange={(e) => setDownload({ ...download, file_name: e.target.value })} />
              </Col>
              <Col>
                <StandardTextField value={download?.file_size} label='Size' onChange={(e) => setDownload({ ...download, file_size: e.target.value })} />
              </Col>
            </Row>
            <Row>
              <Col>
                <StandardDropDown value={download?.os_type} data={osTypes} label='Operating System' onChange={(e) => setDownload({ ...download, os_type: e.target.value })} />
              </Col>
            </Row>
            <Row>
              <Col>
                <StandardTextField value={download?.path} label='Path' onChange={(e) => setDownload({ ...download, path: e.target.value })} />
              </Col>
            </Row>
            <Row style={{ maxWidth: '40%', margin: 'auto', marginTop: '1vh' }}>
              <Col>
                {
                  value === undefined && <StandardButton isActive={!disabledButton} onClick={() => handleAddDownload()}>Add</StandardButton>
                }
                {
                  value !== undefined && <StandardButton isActive={!disabledButton} onClick={() => handleEditDownload()}>Save</StandardButton>
                }
              </Col>
              {
                value !== undefined && <Col><StandardButton onClick={() => handleDeleteDownload()}>Delete</StandardButton></Col>
              }
            </Row>
          </Container>
        </Form.Group>
      </StandardCard>
    </>
  );
};

export default SoftwareCompatibility;
