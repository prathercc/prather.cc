import React, { useContext, useState, useEffect } from 'react';
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
import { StandardCard, StandardModal, getThemeColor } from '../../Utility/Utility';
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
      <CompatibilityTable style={{ ...style }} setActiveOs={setActiveOs} compatibility={compatibility} />
      {userData && <EditDownloads style={{ marginTop: '1vh' }} app={app} setMainDownloads={setMainDownloads} />}
      {!downloads && <Spinner animation='border' />}
      <StandardModal modalOpen={modalOpen} handleModalClose={() => setActiveOs(null)}>
        <div style={{ marginBottom: '2vh' }}>Available Downloads: </div>
        {filteredDownloads.length > 0 && filteredDownloads.map((download, index) => {
          return (
            <SoftwareDownloadOption
              key={download.id}
              downloadLink={download.path}
              downloadName={download.file_name}
              type={download.os_type}
              downloadSize={download.file_size}
              downloads={download.download_count}
              id={download.id}
              index={index}
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

const SoftwareDownloadOption = ({ downloadName, downloadLink, downloadSize, downloads, id, index }) => {
  const appSettings = useContext(AppContext);
  const { softwareFontSize, standardCardTitleFontSize } = appSettings;
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
          <div style={{ display: 'inline', color: getThemeColor(1) }}>[{index + 1}]: </div>
          <div onClick={() => setModalOpen(true)} style={{ marginBottom: '5px', cursor: 'pointer', fontSize: standardCardTitleFontSize, display: 'inline' }} className='defaultMouseOver'>
            {downloadName}
          </div>
        </Col>
      </Row>
      <StandardModal buttons={DownloadButton} title='' modalOpen={modalOpen} handleModalClose={() => { setModalOpen(false) }} closable={false}>
        <div style={{ display: 'inline', color: getThemeColor(1) }}>File Name: </div><div style={{ display: 'inline' }}>{downloadName}</div>
        <div />
        <div style={{ display: 'inline', color: getThemeColor(1) }}>File Size: </div><div style={{ display: 'inline' }}>{downloadSize}</div>
        <div />
        <div style={{ display: 'inline', color: getThemeColor(1) }}>Downloads: </div><div style={{ display: 'inline' }}>{downloads}</div>
      </StandardModal>
    </>
  );
};

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
  }, [downloads]);

  return (
    <>
      <Button style={{ ...style, fontSize: softwareFontSize }} onClick={() => openAndLoadDownloads()} variant='warning' block>
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

const Download = ({ value, app, reloadDownloads, blankDownload = { application_name: app.name, file_name: '', file_size: '', os_type: '', path: '', download_count: 0, software_id: app.id } }) => {
  const [download, setDownload] = useState(value ? blankDownload : value);

  let disabledButton = download?.file_name?.length === 0 || download?.os_type?.length === 0 || download?.file_size?.length === 0 || download?.path?.length === 0;

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
      <Form>
        <Container>
          <Row>
            <Col>
              <Form.Control
                size='sm'
                type='text'
                placeholder='Name'
                value={download.file_name}
                onChange={(e) => setDownload({ ...download, file_name: e.target.value })}
              />
            </Col>
            <Col>
              <Form.Control
                size='sm'
                type='text'
                placeholder='Size'
                value={download.file_size}
                onChange={(e) => setDownload({ ...download, file_size: e.target.value })}
              />
            </Col>
            <Col>
              <Form.Control
                size='sm'
                type='text'
                placeholder='Path'
                value={download.path}
                onChange={(e) => setDownload({ ...download, path: e.target.value })}
              />
            </Col>
            <Col>
              <Form.Control
                onChange={(e) => setDownload({ ...download, os_type: e.target.value })}
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
            {
              value && <Button disabled={disabledButton} onClick={() => handleAddDownload()} variant='success'>Add</Button>
            }
            {
              !value && <Button disabled={disabledButton} onClick={() => handleEditDownload()} variant='success'>Save</Button>
            }
            {
              value && <Button onClick={() => handleDeleteDownload()} variant='danger'>Delete</Button>
            }
          </Row>
        </Container>
      </Form>
    </>
  );
};

const CompatibilityTable = ({ compatibility = { windows: false, linux: false, mac: false, android: false }, style, setActiveOs }) => {
  const appSettings = useContext(AppContext);
  const { standardCardTitleFontSize } = appSettings;
  return (
    <Container fluid style={{ fontSize: standardCardTitleFontSize, ...style, padding: 0 }}>
      <Row>
        <Col onClick={() => setActiveOs('Windows')}>
          <StandardCard className='defaultImageNudge' style={{ cursor: 'pointer' }}>
            <CompatiblityResult boolean={compatibility.windows} />
            <div>Windows</div>
          </StandardCard>
        </Col>
        <Col onClick={() => setActiveOs('Linux')}>
          <StandardCard className='defaultImageNudge' style={{ cursor: 'pointer' }}>
            <CompatiblityResult boolean={compatibility.linux} />
            <div>Linux</div>
          </StandardCard>
        </Col>
        <Col onClick={() => setActiveOs('Mac')}>
          <StandardCard className='defaultImageNudge' style={{ cursor: 'pointer' }}>
            <CompatiblityResult boolean={compatibility.mac} />
            <div>Mac</div>
          </StandardCard>
        </Col>
        <Col onClick={() => setActiveOs('Android')}>
          <StandardCard className='defaultImageNudge' style={{ cursor: 'pointer' }}>
            <CompatiblityResult boolean={compatibility.android} />
            <div>Android</div>
          </StandardCard>
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
      {boolean && <Check style={{ fontSize: iconSize, color: 'rgb(0, 204, 0, 0.8)' }} />}
      {!boolean && <X style={{ fontSize: iconSize, color: 'rgb(255, 0, 0, 0.8)' }} />}
    </>
  );
};

export default SoftwareCompatibility;
