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
import SoftwareModal from '../SoftwareModal/SoftwareModal';
import { incrementDownload } from '../../../downloadService';
import { StandardImage, StandardSeparator, StandardCard, StandardPage } from '../../Utility/Utility';

function SoftwareApplication(props) {
  const { userData } = props;
  let { name } = useParams();
  const [downloads, setDownloads] = useState(null);
  const [features, setFeatures] = useState(null);
  const appSettings = useContext(AppContext);
  const { softwareFontSize } = appSettings;
  const blankApp = {
    android: false,
    description: '',
    icon_link: '',
    id: '',
    image_link: '',
    ios: false,
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
    ios: app.ios,
  };

  return (
    <StandardPage title={<>Application View</>}>
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
                thumbnail: app.icon_link,
                thumbnailWidth: { desktop: '3vw', mobile: '6vw' },
              }}
            />
            <SoftwareCompatibility
              app={app}
              setMainDownloads={setDownloads}
              compatibility={{ ...compatibility }}
              userData={userData}
            >
              {downloads === null ? (
                <Container>
                  <Spinner animation='border' />
                </Container>
              ) : downloads.length === 0 ? (
                <p>N/A</p>
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
                  )}
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
    </StandardPage>
  );
}

const SoftwareFeature = (props) => {
  const appSettings = useContext(AppContext);
  const { softwareFontSize } = appSettings;
  const { userData, descriptionObject, index } = props;
  const breakpoint = useCurrentBreakpointName();

  const cardTitle =
    <Container style={{ marginTop: '2vh', marginBottom: '1vh' }}>
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
    </Container>;

  return (
    <StandardCard title={cardTitle} style={{ marginTop: '2vh' }}>
      <div style={{ color: 'grey' }}>Feature #{index + 1}</div>
      <StandardImage
        src={descriptionObject.image || ''}
        onClick={() => descriptionObject.image ? window.open(descriptionObject.image) : ''}
        style={{ width: breakpoint === 'xlarge' ? descriptionObject.imageWidth.desktop : descriptionObject.imageWidth.mobile, marginTop: '1vh', cursor: 'pointer' }}
      />
      <div style={{ marginTop: '1vh', color: 'grey' }}>(Click image to enlarge)</div>
      <StandardCard title='' style={{ marginTop: '1vh', marginBottom: '1vh', width: '80%' }} />
      <div
        style={{ textAlign: 'left' }}
        dangerouslySetInnerHTML={{
          __html: descriptionObject.content_description,
        }}
      />
      {
        userData ?
          (
            <Button
              style={{ fontSize: softwareFontSize }}
              onClick={() =>
                window.open(`/software/admin/feature/edit/${descriptionObject.application_name}/${descriptionObject.id}`, '_self')
              }
              block
              variant='warning'
            > Edit </Button>)
          : ('')
      }
    </StandardCard>
  );
};

const SoftwareDownloadOption = (props) => {
  const {
    downloadName,
    downloadLink,
    type,
    downloadSize,
    downloads,
    id,
  } = props;
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

      <SoftwareModal
        title=''
        modalOpen={modalOpen}
        handleModalClose={() => { }}
        titleIcon={<Icon />}
        closable={false}
      >
        <p>Starting download for {downloadName}...</p>
        <Spinner animation='border' />
      </SoftwareModal>
    </>
  );
};


const SoftwareTitle = (props) => {
  const { titleObject } = props;
  const breakpoint = useCurrentBreakpointName();
  const cardTitle = <><StandardImage src={titleObject.thumbnail} style={{ width: breakpoint === 'xlarge' ? titleObject.thumbnailWidth.desktop : titleObject.thumbnailWidth.mobile }} />{titleObject.title}</>

  return (
    <StandardCard title={cardTitle}>
      <Container>
        <Card.Text
          dangerouslySetInnerHTML={{ __html: titleObject.description }}
        ></Card.Text>
      </Container>
      <Card.Body>
        <StandardImage
          style={{
            width:
              breakpoint === 'xlarge'
                ? titleObject.imageWidth.desktop
                : titleObject.imageWidth.mobile,
          }}
          variant='top'
          src={titleObject.image}
        />
      </Card.Body>
    </StandardCard>
  );
};

const MaintenanceAlert = (props) => {
  const appSettings = useContext(AppContext);
  const { softwareMaintenanceFontSize } = appSettings;
  const { maintained = false } = props;
  return (
    <Alert variant='danger' dismissible={false} show={true} style={{ fontSize: softwareMaintenanceFontSize, display: maintained ? 'none' : '' }} >
      This application is not currently receiving new updates
    </Alert>
  );
}

export default SoftwareApplication;
