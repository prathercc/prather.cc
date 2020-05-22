import React, { useEffect, useState, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import SoftwareCompatibility from '../SoftwareCompatibility/SoftwareCompatibility';
import SoftwareCode from '../SoftwareCode/SoftwareCode';
import { fetchDownloads } from '../../../downloadService';
import { fetchSoftware } from '../../../softwareService';
import { useParams } from 'react-router-dom';
import { fetchFeatures } from '../../../featureService';
import '../Software.css';
import { AppContext } from '../../../AppContext';
import { useCurrentBreakpointName } from 'react-socks';
import { StandardImage, StandardCard, StandardPage, StandardModal, getThemeColor } from '../../Utility/Utility';

function SoftwareApplication(props) {
  const { userData } = props;
  let { name } = useParams();
  const [downloads, setDownloads] = useState(null);
  const [features, setFeatures] = useState(null);
  const [imageModalObj, setImageModalObj] = useState({ open: false, imageLink: '' });
  const appSettings = useContext(AppContext);
  const { softwareFontSize } = appSettings;
  const blankApp = {
    android: false,
    description: '',
    icon_link: '',
    id: '',
    image_link: '',
    is_legacy: false,
    languages: '',
    linux: false,
    mac: false,
    name: '',
    repo_link: '',
    windows: false,
  };
  const [app, setApp] = useState(blankApp);

  useEffect(() => {
    const fetch = async () => {
      await fetchDownloads(app.id, setDownloads);
    };
    const featureFetch = async () => {
      await fetchFeatures(app.id, setFeatures);
    };
    if (app !== blankApp) {
      fetch();
      featureFetch();
    }
  }, [app]);

  useEffect(() => {
    const fetch = async (val) => {
      await fetchSoftware(val, setApp);
    };
    if (props.name) {
      fetch(props.name);
    } else {
      fetch(name);
    }
  }, []);

  const compatibility = {
    windows: app.windows,
    linux: app.linux,
    mac: app.mac,
    android: app.android,
  };

  return (
    <StandardPage title={app.name}>
      {app === blankApp ? (
        <Spinner animation='border' />
      ) : (
          <>
            <MaintenanceAlert
              maintained={!app.is_legacy}
            />
            <SoftwareTitle
              titleObject={{
                title: app.name,
                description: app.description,
                image: app.image_link
              }}
              setImageModalObj={setImageModalObj}
            />
            <SoftwareCompatibility
              style={{ marginTop: '2vh' }}
              app={app}
              setMainDownloads={setDownloads}
              compatibility={{ ...compatibility }}
              userData={userData}
              downloads={downloads}
            />

            <SoftwareCode repoLink={app.repo_link} />

          </>
        )}

      {userData ? (
        <Button
          onClick={() =>
            window.open(`/software/admin/feature/new/${app.name}`, '_self')
          }
          style={{ marginTop: '1vh', fontSize: softwareFontSize }}
          block
          variant='warning'
        >
          Add Feature
        </Button>
      ) : (
          ''
        )}

      {features !== null
        ? features.map((feature, index) => {
          return (
            <SoftwareFeature
              style={{ marginTop: '2vh' }}
              setImageModalObj={setImageModalObj}
              index={index}
              key={feature.id}
              userData={userData}
              descriptionObject={{
                image: feature.image_link,
                title: feature.title,
                description: feature.description,
                content_title: feature.content_title,
                content_description: feature.content_description,
                id: feature.id,
                application_name: feature.application_name,
              }}
            />
          );
        })
        : ''}
      <ImageModal modalOpen={imageModalObj.open} handleModalClose={() => setImageModalObj({ ...imageModalObj, open: false })} imageLink={imageModalObj.imageLink} />
    </StandardPage>
  );
}

const ImageModal = ({ modalOpen, handleModalClose, imageLink }) => {
  const appSettings = useContext(AppContext);
  const { softwareFontSize } = appSettings;
  const RawButton = <Button variant='outline-light' style={{ marginTop: '1vh', fontSize: softwareFontSize }} onClick={() => window.open(imageLink)}>View Raw Image</Button>
  return (
    <StandardModal buttons={RawButton} modalOpen={modalOpen} handleModalClose={handleModalClose}>
      <img src={imageLink} style={{ maxWidth: '85%', marginTop: '2vh' }} />
    </StandardModal>
  )
}

const SoftwareFeature = ({ userData, descriptionObject, index, setImageModalObj, style, desktop = '25vw', mobile = '50vw' }) => {
  const appSettings = useContext(AppContext);
  const { softwareFontSize } = appSettings;
  const breakpoint = useCurrentBreakpointName();

  const cardTitle =
    <Container>
      <Row>
        <Col>
          {descriptionObject.title}
        </Col>
      </Row>
      <Row>
        <Col>
          {descriptionObject.description}
        </Col>
      </Row>
      <Row>
        <Col>
          <div style={{ color: getThemeColor(0.8), fontSize: softwareFontSize }}>Feature #{index + 1}</div>
        </Col>
      </Row>
    </Container>;

  return (
    <StandardCard title={cardTitle} style={{ ...style }}>
      <Card.Body style={{ width: '90%', padding: '1vh' }}>
        <StandardImage
          className='defaultImageNudge'
          src={descriptionObject.image}
          onClick={() => setImageModalObj({ open: true, imageLink: descriptionObject.image })}
          style={{ width: breakpoint === 'xlarge' ? desktop : mobile, cursor: 'pointer', marginBottom: '1vh' }}
        />
        <div style={{ textAlign: 'left', margin: 'auto' }} dangerouslySetInnerHTML={{ __html: descriptionObject.content_description }} />
        {
          userData ?
            (
              <Button style={{ fontSize: softwareFontSize }} block variant='warning'
                onClick={() =>
                  window.open(`/software/admin/feature/edit/${descriptionObject.application_name}/${descriptionObject.id}`, '_self')
                }> Edit </Button>)
            : ('')
        }
      </Card.Body>
    </StandardCard>
  );
};

const SoftwareTitle = ({ titleObject, setImageModalObj, desktop = '25vw', mobile = '50vw' }) => {
  const breakpoint = useCurrentBreakpointName();
  return (
    <StandardCard>
      <Card.Body style={{ paddingTop: 0, paddingBottom: '1vh' }}>
        <div style={{ marginBottom: '1vh' }} dangerouslySetInnerHTML={{ __html: titleObject.description }} />
        <StandardImage
          className='defaultImageNudge'
          style={{
            cursor: 'pointer',
            width:
              breakpoint === 'xlarge'
                ? desktop
                : mobile,
          }}
          onClick={() => setImageModalObj({ open: true, imageLink: titleObject.image })}
          variant='top'
          src={titleObject.image}
        />
      </Card.Body>
    </StandardCard>
  );
};

const MaintenanceAlert = ({ maintained = false }) => {
  const appSettings = useContext(AppContext);
  const { softwareMaintenanceFontSize } = appSettings;

  return (
    <Alert variant='danger' dismissible={false} show={true} style={{ fontSize: softwareMaintenanceFontSize, display: maintained ? 'none' : '' }} >
      This application is not currently receiving new updates
    </Alert>
  );
}

export default SoftwareApplication;
