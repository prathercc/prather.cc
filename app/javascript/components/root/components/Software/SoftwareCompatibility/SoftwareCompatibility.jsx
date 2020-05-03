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
import SoftwareModal from '../SoftwareModal/SoftwareModal';
import { fetchDownloads, postDownload, putDownload, deleteDownload } from '../../../downloadService';
import { StandardCard } from '../../Utility/Utility';

function SoftwareCompatibility(props) {
  const { compatibility, app, setMainDownloads, userData } = props;
  const appsettings = useContext(AppContext);
  const { standardCardTitleFontSize } = appsettings;

  return (
    <StandardCard title='System Compatibility' style={{ marginTop: '2vh' }}>
      <Card.Body style={{ width: '90%' }}>
        <CompatibilityTable compatibility={compatibility} />
        {userData ? (
          <EditDownloads
            app={app}
            setMainDownloads={setMainDownloads}
          />
        ) : (
            ''
          )}
        <Container style={{ marginTop: '2vh' }}>
          <div style={{ fontSize: standardCardTitleFontSize }}>Download(s)</div>
          {props.children ? props.children : <p>N/A</p>}
        </Container>
      </Card.Body>
    </StandardCard>
  );
}

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
      <SoftwareModal
        title='Modify Downloads'
        modalOpen={modalOpen}
        handleModalClose={handleModalClose}
      >
        {downloadsLoading ? (
          <Spinner animation='border' />
        ) : (
            downloads.map((download) => {
              return (
                <Download
                  key={download.id}
                  value={download}
                  app={app}
                  reloadDownloads={openAndLoadDownloads}
                />
              );
            })
          )}
        <Download app={app} reloadDownloads={openAndLoadDownloads} />
      </SoftwareModal>
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
                <option>iOS</option>
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
      android: false,
      ios: false,
    },
  } = props;
  return (
    <Table
      variant='dark'
      striped
      bordered
      responsive
      size='sm'
      style={{ marginTop: '2vh', width: '95%', margin: 'auto' }}
    >
      <thead>
        <tr>
          <th>Windows</th>
          <th>Linux</th>
          <th>Mac</th>
          <th>Android</th>
          <th>iOS</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <CompatiblityResult boolean={compatibility.windows} />
          <CompatiblityResult boolean={compatibility.linux} />
          <CompatiblityResult boolean={compatibility.mac} />
          <CompatiblityResult boolean={compatibility.android} />
          <CompatiblityResult boolean={compatibility.ios} />
        </tr>
      </tbody>
    </Table>
  );
};

const CompatiblityResult = (props) => {
  const appSettings = useContext(AppContext);
  const { iconSizing } = appSettings;
  const { boolean } = props;
  return (
    <td>
      {boolean ? (
        <Check
          style={{
            color: 'limegreen',
            fontSize: iconSizing,
          }}
        />
      ) : (
          <X
            style={{
              color: 'red',
              fontSize: iconSizing,
            }}
          />
        )}
    </td>
  );
};

export default SoftwareCompatibility;
