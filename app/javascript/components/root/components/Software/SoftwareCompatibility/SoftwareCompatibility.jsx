import React, { useContext, useState, useEffect } from 'react';
import {Card,Table,Button,Container,Spinner,Form,Row,Col,} from 'react-bootstrap';
import { AppContext } from '../../../AppContext';
import { Check, X } from 'react-bootstrap-icons';
import SoftwareModal from '../SoftwareModal/SoftwareModal';
import {fetchDownloads,postDownload,putDownload,deleteDownload} from '../../../downloadService';
import { getSession } from '../../../authService';

function SoftwareCompatibility(props) {
  const appSettings = useContext(AppContext);
  const { fgColorDetail } = appSettings;
  const { compatibility, appName, setMainDownloads } = props;
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      await getSession(setUserData);
    };
    fetchSession();
  }, []);

  return (
    <Card
      style={{
        backgroundColor: fgColorDetail,
        alignItems: 'center',
        marginTop: '5vh',
        outline: '1px solid gray',
      }}
    >
      <Card.Body>
        <strong>System Compatibility</strong>
        <CompatibilityTable compatibility={compatibility} />
        {userData ? (
          <EditDownloads
            appName={appName}
            setMainDownloads={setMainDownloads}
          />
        ) : (
          ''
        )}
        <Container>
          <strong>Download(s)</strong>
          {props.children ? props.children : <p>N/A</p>}
        </Container>
      </Card.Body>
    </Card>
  );
}

const EditDownloads = (props) => {
  const { appName, setMainDownloads } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [downloads, setDownloads] = useState(null);
  const [downloadsLoading, setDownloadsLoading] = useState(true);

  const handleModalClose = async () => {
    setModalOpen(false);
    setDownloadsLoading(true);
    await fetchDownloads(appName, setMainDownloads);
  };

  const openAndLoadDownloads = async () => {
    setModalOpen(true);
    await fetchDownloads(appName, setDownloads);
  };

  useEffect(() => {
    if (downloads !== null) {
      setDownloadsLoading(false);
    }
  }, [downloads]);

  return (
    <>
      <Button onClick={() => openAndLoadDownloads()} variant='warning' block>
        Modify {appName} Downloads
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
                appName={appName}
                reloadDownloads={openAndLoadDownloads}
              />
            );
          })
        )}
        <Download appName={appName} reloadDownloads={openAndLoadDownloads} />
      </SoftwareModal>
    </>
  );
};

const Download = (props) => {
  const { value, appName, reloadDownloads } = props;

  const blankDownload = {
    application_name: appName,
    file_name: '',
    file_size: '',
    os_type: '',
    path: '',
  };

  const [download, setDownload] = useState(
    value === undefined ? blankDownload : value
  );

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
              </Form.Control>
            </Col>

            {value === undefined ? (
              <Button onClick={() => handleAddDownload()} variant='success'>
                Add
              </Button>
            ) : (
              <Button onClick={() => handleEditDownload()} variant='success'>
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
      hover
      responsive
      style={{ width: '35vw', marginTop: '2vh' }}
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
            color: 'green',
            fontSize: iconSizing,
            filter: 'grayscale(0.5)',
          }}
        />
      ) : (
        <X
          style={{
            color: 'red',
            fontSize: iconSizing,
            filter: 'grayscale(0.5)',
          }}
        />
      )}
    </td>
  );
};

export default SoftwareCompatibility;
