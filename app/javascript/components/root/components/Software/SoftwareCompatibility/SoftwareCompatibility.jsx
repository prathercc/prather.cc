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

function SoftwareCompatibility({ compatibility, app, setMainDownloads, userData, downloads, style }) {
  return (
    <StandardCard title='Available Platforms' style={{ ...style }}>
      <Card.Body style={{ width: '90%', padding: '1vh' }}>
        <CompatibilityTable compatibility={compatibility} />
        {userData && <EditDownloads app={app} setMainDownloads={setMainDownloads} />}
        {!downloads && <Spinner animation='border' />}
        {downloads?.length > 0 && downloads.map((download) => {
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
      </Card.Body>
    </StandardCard>
  );
}

const SoftwareDownloadOption = ({ downloadName, downloadLink, type, downloadSize, downloads, id }) => {
  const appSettings = useContext(AppContext);
  const { softwareFontSize } = appSettings;
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
          <div onClick={() => setModalOpen(true)} style={{ outline: `1px dotted ${getThemeColor(0.1)}`, marginBottom: '5px', cursor: 'pointer', fontSize: softwareFontSize }} className='defaultMouseOver'>
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
        <div style={{ marginTop: '1vh', color: getThemeColor(1) }}>{downloadLink}</div>
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

const CompatibilityTable = (props) => {
  const {
    compatibility = {
      windows: false,
      linux: false,
      mac: false,
      android: false
    },
  } = props;
  return (
    <Table
      variant='dark'
      striped
      bordered
      responsive
      size='sm'
      style={{ width: '100%', marginBottom: '1vh' }}
    >
      <thead>
        <tr>
          <th>Windows</th>
          <th>Linux</th>
          <th>Mac</th>
          <th>Android</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <CompatiblityResult boolean={compatibility.windows} />
          <CompatiblityResult boolean={compatibility.linux} />
          <CompatiblityResult boolean={compatibility.mac} />
          <CompatiblityResult boolean={compatibility.android} />
        </tr>
      </tbody>
    </Table>
  );
};

const CompatiblityResult = ({ boolean }) => {
  const iconSize = '3vw';

  return (
    <td>
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
    </td>
  );
};

export default SoftwareCompatibility;
