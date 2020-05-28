import React, { useContext, useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Check from 'react-bootstrap-icons/dist/icons/check';
import X from 'react-bootstrap-icons/dist/icons/x';
import { AppContext } from '../../../AppContext';
import { fetchDownloads, postDownload, putDownload, deleteDownload, incrementDownload } from '../../../downloadService';
import { StandardCard, StandardModal, StandardSeparator, getThemeColor } from '../../Utility/Utility';
import { useCurrentBreakpointName } from 'react-socks';

function SoftwareCompatibility({ compatibility, app, setMainDownloads, userData, downloads, style }) {
  const [activeOs, setActiveOs] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [filteredDownloads, setFilteredDownloads] = useState([]);

  useEffect(() => {
    setModalOpen(activeOs ? true : false);
    if (activeOs) {
      let osDownloads = downloads?.filter(x => x.os_type === activeOs);
      setFilteredDownloads(osDownloads.length !== 0 ? downloads.filter(x => x.os_type === 'Resource' || x.os_type === activeOs) : []);
    }
  }, [activeOs]);

  return (
    <>
      <StandardCard style={{ ...style }}>
        <Card.Body style={{ width: '90%', padding: '1vh' }}>
          <CompatibilityTable setActiveOs={setActiveOs} style={{ marginBottom: '1vh' }} compatibility={compatibility} />
          {userData && <EditDownloads app={app} setMainDownloads={setMainDownloads} />}
          {!downloads && <Spinner animation='border' />}
        </Card.Body>
      </StandardCard>
      <StandardModal modalOpen={modalOpen} handleModalClose={() => setActiveOs(null)}>
        <div style={{ marginBottom: '2vh' }}>Available Downloads: </div>
        {filteredDownloads.length > 0 && filteredDownloads.map((download) => {
          return (
            <SoftwareDownloadOption
              key={download.id}
              downloadLink={download.path}
              downloadName={download.file_name}
              type={download.os_type}
              downloadSize={download.file_size}
              downloads={download.download_count}
              id={download.id}
            />
          );
        })}
        {
          filteredDownloads?.length < 1 && 'Not found :('
        }
      </StandardModal>
    </>
  );
}

const SoftwareDownloadOption = ({ downloadName, downloadLink, type, downloadSize, downloads, id }) => {
  const appSettings = useContext(AppContext);
  const { softwareFontSize, softwareMaintenanceFontSize } = appSettings;
  const [modalOpen, setModalOpen] = useState(false);

  const handleDownload = async () => {
    await incrementDownload(id);
    window.open(downloadLink);
    setModalOpen(false);
  };
  const DownloadButton = <Button onClick={handleDownload} variant='outline-light' style={{ marginTop: '1vh', fontSize: softwareFontSize }}>Download</Button>

  return (
    <>
      <Row>
        <Col>
          <div onClick={() => setModalOpen(true)} style={{ marginBottom: '5px', cursor: 'pointer', fontSize: softwareFontSize }} className='defaultMouseOver'>
            {downloadName} <StandardSeparator /> {`${type.charAt(0).toUpperCase() + type.slice(1)}`}
          </div>
        </Col>
      </Row>
      <StandardModal buttons={DownloadButton} title='' modalOpen={modalOpen} handleModalClose={() => { setModalOpen(false) }} closable={false}>
        <div style={{ display: 'inline' }}>File Name: </div><div style={{ display: 'inline', color: getThemeColor(1) }}>{downloadName}</div>
        <div />
        <div style={{ display: 'inline' }}>File Size: </div><div style={{ display: 'inline', color: getThemeColor(1) }}>{downloadSize}</div>
        <div />
        <div style={{ display: 'inline' }}>Downloads: </div><div style={{ display: 'inline', color: getThemeColor(1) }}>{downloads}</div>
        <div />
        <div style={{ display: 'inline', color: getThemeColor(1) }}>{downloadLink}</div>
      </StandardModal>
    </>
  );
};

const EditDownloads = (props) => {
  const { app, setMainDownloads } = props;
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
  }, [downloads]);

  return (
    <>
      <Button style={{ fontSize: softwareFontSize }} onClick={() => openAndLoadDownloads()} variant='warning' block>
        Modify {app.name} Downloads
      </Button>
      <StandardModal
        title='Modify Downloads'
        modalOpen={modalOpen}
        handleModalClose={handleModalClose}
      >
        {downloadsLoading && <Spinner animation='border' />}
        {!downloadsLoading && downloads.map((download) => {
          return (
            <Download
              key={download.id}
              value={download}
              app={app}
              reloadDownloads={openAndLoadDownloads}
            />
          );
        })}
        <Download app={app} reloadDownloads={openAndLoadDownloads} />
      </StandardModal>
    </>
  );
};

const Download = (props) => {
  const { value, app, reloadDownloads } = props;
  const blankDownload = {
    application_name: app.name,
    file_name: '',
    file_size: '',
    os_type: '',
    path: '',
    download_count: 0,
    software_id: app.id
  };

  const [download, setDownload] = useState(
    value === undefined ? blankDownload : value
  );

  let disabledButton = download.file_name.length === 0 || download.os_type.length === 0 || download.file_size.length === 0 || download.path.length === 0;

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
      <Form style={{ marginTop: '2vh' }}>
        <Container>
          <Row>
            <Col>
              <Form.Control
                size='sm'
                type='text'
                placeholder='Name'
                value={download.file_name}
                onChange={(e) =>
                  setDownload({ ...download, file_name: e.target.value })
                }
              />
            </Col>
            <Col>
              <Form.Control
                size='sm'
                type='text'
                placeholder='Size'
                value={download.file_size}
                onChange={(e) =>
                  setDownload({ ...download, file_size: e.target.value })
                }
              />
            </Col>
            <Col>
              <Form.Control
                size='sm'
                type='text'
                placeholder='Path'
                value={download.path}
                onChange={(e) =>
                  setDownload({ ...download, path: e.target.value })
                }
              />
            </Col>
            <Col>
              <Form.Control
                onChange={(e) =>
                  setDownload({ ...download, os_type: e.target.value })
                }
                size='sm'
                as='select'
                value={download.os_type}
              >
                <option></option>
                <option>Windows</option>
                <option>Linux</option>
                <option>Mac</option>
                <option>Android</option>
                <option>Resource</option>
              </Form.Control>
            </Col>

            {value === undefined ? (
              <Button disabled={disabledButton} onClick={() => handleAddDownload()} variant='success'>
                Add
              </Button>
            ) : (
                <Button disabled={disabledButton} onClick={() => handleEditDownload()} variant='success'>
                  Save
                </Button>
              )}
            {value === undefined ? (
              ''
            ) : (
                <Button onClick={() => handleDeleteDownload()} variant='danger'>
                  Delete
                </Button>
              )}
          </Row>
        </Container>
      </Form>
    </>
  );
};

const CompatibilityTable = ({ compatibility = { windows: false, linux: false, mac: false, android: false }, style, setActiveOs }) => {
  const colStyling = { cursor: 'pointer', marginLeft: '1px', paddingLeft: 0, paddingRight: 0, paddingTop: '1px', paddingBottom: '5px' }
  const appSettings = useContext(AppContext);
  const { standardCardTitleFontSize } = appSettings;
  return (
    <Container style={{ ...style, margin: 0, fontSize: standardCardTitleFontSize }}>
      <Row>
        <Col className='defaultMouseOver' onClick={() => setActiveOs('Windows')} style={{ ...colStyling }}>
          <CompatiblityResult boolean={compatibility.windows} />
          <div>Windows</div>
        </Col>
        <Col className='defaultMouseOver' onClick={() => setActiveOs('Linux')} style={{ ...colStyling }}>
          <CompatiblityResult boolean={compatibility.linux} />
          <div>Linux</div>
        </Col>
        <Col className='defaultMouseOver' onClick={() => setActiveOs('Mac')} style={{ ...colStyling }}>
          <CompatiblityResult boolean={compatibility.mac} />
          <div>Mac</div>
        </Col>
        <Col className='defaultMouseOver' onClick={() => setActiveOs('Android')} style={{ ...colStyling }}>
          <CompatiblityResult boolean={compatibility.android} />
          <div>Android</div>
        </Col>
      </Row>
    </Container>
  );
};

const CompatiblityResult = ({ boolean }) => {
  const breakpoint = useCurrentBreakpointName();
  const iconSize = breakpoint === 'xsmall' ? '7vw' : breakpoint === 'large' ? '4.5vw' : breakpoint === 'medium' ? '5.5vw' : breakpoint === 'small' ? '6.5vw' : '3vw';

  return (
    <>
      {boolean && <Check
        style={{
          color: 'limegreen',
          fontSize: iconSize,
        }}
      />}
      {!boolean && <X
        style={{
          color: 'red',
          fontSize: iconSize,
        }}
      />}
    </>
  );
};

export default SoftwareCompatibility;
