import React, { useEffect, useState, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import Download from 'react-bootstrap-icons/dist/icons/download';
import SoftwareCompatibility from '../SoftwareCompatibility/SoftwareCompatibility';
import SoftwareCode from '../SoftwareCode/SoftwareCode';
import { fetchDownloads } from '../../../downloadService';
import { fetchSoftware } from '../../../softwareService';
import { useParams } from 'react-router-dom';
import { fetchFeatures } from '../../../featureService';
import '../Software.css';
import { AppContext } from '../../../AppContext';
import { useCurrentBreakpointName } from 'react-socks';
import { incrementDownload } from '../../../downloadService';
import { StandardImage, StandardSeparator, StandardCard, StandardPage, StandardModal, getThemeColor } from '../../Utility/Utility';

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
                image: app.image_link,
                imageWidth: { desktop: '25vw', mobile: '50vw' },
              }}
              setImageModalObj={setImageModalObj}
            />
            <SoftwareCompatibility
              app={app}
              setMainDownloads={setDownloads}
              compatibility={{ ...compatibility }}
              userData={userData}
            >
              {/* {downloads === null ? (
                <Container>
                  <Spinner animation='border' />
                </Container>
              ) : downloads.length === 0 ? (
                ''
              ) : (
                    downloads.map((download) => {
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
                    })
                  )} */}
            </SoftwareCompatibility>
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
              setImageModalObj={setImageModalObj}
              index={index}
              key={feature.id}
              userData={userData}
              descriptionObject={{
                image: feature.image_link,
                imageWidth: { desktop: '25vw', mobile: '50vw' },
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
  const RawButton = <Button variant='light' style={{ marginTop: '1vh' }} onClick={() => window.open(imageLink)}>View Raw Image</Button>

  return (
    <StandardModal buttons={RawButton} modalOpen={modalOpen} handleModalClose={handleModalClose}>
      <img src={imageLink} style={{ maxWidth: '85%', marginTop: '2vh' }} />
    </StandardModal>
  )
}

const SoftwareFeature = ({ userData, descriptionObject, index, setImageModalObj }) => {
  const appSettings = useContext(AppContext);
  const { softwareFontSize } = appSettings;
  const breakpoint = useCurrentBreakpointName();

  const cardTitle =
    <Container style={{ marginBottom: '1vh' }}>
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
    <StandardCard title={cardTitle} style={{ marginTop: '2vh' }}>
      <StandardImage
        className='defaultImageNudge'
        src={descriptionObject.image}
        onClick={() => setImageModalObj({ open: true, imageLink: descriptionObject.image })}
        style={{ width: breakpoint === 'xlarge' ? descriptionObject.imageWidth.desktop : descriptionObject.imageWidth.mobile, cursor: 'pointer', marginBottom: '1vh' }}
      />
      <div style={{ textAlign: 'left', marginTop: '1vh' }} dangerouslySetInnerHTML={{ __html: descriptionObject.content_description }} />
      {
        userData ?
          (
            <Button style={{ fontSize: softwareFontSize }} block variant='warning'
              onClick={() =>
                window.open(`/software/admin/feature/edit/${descriptionObject.application_name}/${descriptionObject.id}`, '_self')
              }> Edit </Button>)
          : ('')
      }
    </StandardCard>
  );
};

const SoftwareDownloadOption = ({ downloadName, downloadLink, type, downloadSize, downloads, id }) => {
  const appSettings = useContext(AppContext);
  const { iconSizing, softwareFontSize } = appSettings;
  const [modalOpen, setModalOpen] = useState(false);
  const breakpoint = useCurrentBreakpointName();

  const handleModalOpen = async () => {
    await incrementDownload(id);
    setModalOpen(true);
    window.setTimeout(() => {
      window.open(downloadLink);
      setModalOpen(false);
    }, 3000);
  };

  const Icon = () => {
    return <Download style={{ fontSize: iconSizing }} />;
  };

  return (
    <>
      <Row>
        <Col>
          <Button
            variant='dark'
            style={{ marginTop: '1vh', fontSize: softwareFontSize }}
            size={breakpoint === 'xsmall' ? 'sm' : 'md'}
            onClick={() => handleModalOpen()}
            block
          >
            <div style={{ display: 'inline' }}>{`${downloadName} `}</div>
            <StandardSeparator />
            <div style={{ display: 'inline' }}>{`${downloadSize} `}</div>
            <StandardSeparator />
            <div style={{ display: 'inline' }}>{`${type.charAt(0).toUpperCase() + type.slice(1)}`}</div>
            <div>{`${downloads} downloads`}</div>
          </Button>
        </Col>
      </Row>

      <StandardModal title='' modalOpen={modalOpen} handleModalClose={() => { }} titleIcon={<Icon />} closable={false}>
        <p>Starting download for {downloadName}...</p>
        <Spinner animation='border' />
      </StandardModal>
    </>
  );
};


const SoftwareTitle = ({ titleObject, setImageModalObj }) => {
  const breakpoint = useCurrentBreakpointName();

  return (
    <StandardCard>
      <Container>
        <Card.Text
          dangerouslySetInnerHTML={{ __html: titleObject.description }}
        ></Card.Text>
      </Container>
      <Card.Body>
        <StandardImage
          className='defaultImageNudge'
          style={{
            cursor: 'pointer',
            width:
              breakpoint === 'xlarge'
                ? titleObject.imageWidth.desktop
                : titleObject.imageWidth.mobile,
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
