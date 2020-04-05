import React, { useContext, useState, useEffect } from 'react';
import { Card, Table, Button, Container, Spinner } from 'react-bootstrap';
import { AppContext } from '../../../AppContext';
import { Check, X } from 'react-bootstrap-icons';
import { useCurrentBreakpointName } from 'react-socks';
import SoftwareModal from '../SoftwareModal/SoftwareModal';
import { fetchDownloads } from '../../../downloadService';

function SoftwareCompatibility(props) {
  const appSettings = useContext(AppContext);
  const { fgColorDetail } = appSettings;
  const { compatibility, appName } = props;

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
        <EditDownloads appName={appName} />
        <Container>
          <strong>Download(s)</strong>
          {props.children ? props.children : <p>N/A</p>}
        </Container>
      </Card.Body>
    </Card>
  );
}

const EditDownloads = (props) => {
  const { appName } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [downloads, setDownloads] = useState(null);
  const [downloadsLoading, setDownloadsLoading] = useState(true);

  const handleModalClose = () => {
    setModalOpen(false);
    setDownloadsLoading(true);
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
        {downloadsLoading ? <Spinner animation='border' /> : 'Loaded'}
      </SoftwareModal>
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
