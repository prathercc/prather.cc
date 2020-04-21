import React, { useEffect, useState, useContext } from 'react';
import {
  Container,
  Spinner,
  Button,
  Image,
  Card,
  Accordion,
  Col,
  Row,
  ListGroup,
  Alert
} from 'react-bootstrap';
import SoftwarePage from '../SoftwarePage/SoftwarePage';
import SoftwareCompatibility from '../SoftwareCompatibility/SoftwareCompatibility';
import SoftwareCode from '../SoftwareCode/SoftwareCode';
import { fetchDownloads } from '../../../downloadService';
import { fetchSoftware } from '../../../softwareService';
import { useParams } from 'react-router-dom';
import { fetchFeatures } from '../../../featureService';
import '../Software.css';
import { Window } from 'react-bootstrap-icons';
import { AppContext } from '../../../AppContext';
import { useCurrentBreakpointName } from 'react-socks';
import SoftwareModal from '../SoftwareModal/SoftwareModal';
import { incrementDownload } from '../../../downloadService';
import * as RBI from 'react-bootstrap-icons';

function SoftwareApplication(props) {
  const { userData } = props;
  let { name } = useParams();
  const [downloads, setDownloads] = useState(null);
  const [features, setFeatures] = useState(null);
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
    <SoftwarePage>
      {app === blankApp ? (
        <Spinner animation='border' />
      ) : (
        <>
          <MaintenanceAlert
            applicationName={app.name}
            maintained={!app.is_legacy}
          />
          <SoftwareTitle
            titleObject={{
              title: app.name,
              description: app.description,
              image: app.image_link,
              imageWidth: { desktop: '30vw', mobile: '50vw' },
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
          style={{ marginTop: '1vh' }}
          block
          variant='warning'
        >
          Add Feature
        </Button>
      ) : (
        ''
      )}

      {features !== null
        ? features.map((feature) => {
            return (
              <SoftwareFeature
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
    </SoftwarePage>
  );
}

const SoftwareFeature = (props) => {
  const appSettings = useContext(AppContext);
  const { fgColorDetail, fgColor, iconSizing, textColor } = appSettings;
  const { userData, descriptionObject } = props;
  const [bgColor, setBgColor] = useState(fgColorDetail);
  const [activeClass, setActiveClass] = useState('');
  return (
    <Accordion>
      <Card
        style={{
          backgroundColor: fgColorDetail,
          alignItems: 'center',
          marginTop: '5vh',
          flexDirection: 'row',
          outline: '1px solid gray',
        }}
      >
        <Container>
          <Row>
            <Col>
              <Accordion.Toggle as={Card.Body} eventKey='0'>
                <Card.Header
                  onMouseEnter={() => setActiveClass('Hover-glow')}
                  onMouseLeave={() => setActiveClass('')}
                  style={{ cursor: 'pointer', backgroundColor: bgColor }}
                  className={activeClass}
                >
                  <Window style={{ color: textColor, fontSize: iconSizing }} />

                  <Container>
                    <Row>
                      <Col>
                        <strong>{descriptionObject.title}</strong>
                      </Col>
                    </Row>
                    <Row>
                      <Col>{descriptionObject.description}</Col>
                    </Row>
                  </Container>
                </Card.Header>
              </Accordion.Toggle>
            </Col>
          </Row>

          <Row>
            <Col>
              <Accordion.Collapse eventKey='0'>
                <Card.Body>
                  <Image
                    src={
                      descriptionObject.image !== undefined
                        ? descriptionObject.image
                        : ''
                    }
                    onClick={() =>
                      descriptionObject.image !== undefined
                        ? window.open(descriptionObject.image)
                        : ''
                    }
                    style={{
                      width: descriptionObject.imageWidth.desktop,
                      cursor: 'pointer',
                    }}
                  />

                  <Container style={{ marginTop: '1vh' }}>
                    <Row>
                      <Col>
                        <strong>{descriptionObject.content_title}</strong>
                      </Col>
                    </Row>
                    <ListGroup style={{ textAlign: 'left' }}>
                      <ListGroup.Item
                        style={{ cursor: 'default' }}
                        action
                        variant='dark'
                      >
                        <div
                          dangerouslySetInnerHTML={{
                            __html: descriptionObject.content_description,
                          }}
                        ></div>
                      </ListGroup.Item>
                    </ListGroup>
                  </Container>
                </Card.Body>
              </Accordion.Collapse>
            </Col>
          </Row>
          {userData ? (
            <Button
              onClick={() =>
                window.open(
                  `/software/admin/feature/edit/${descriptionObject.application_name}/${descriptionObject.id}`,
                  '_self'
                )
              }
              block
              variant='warning'
            >
              Edit
            </Button>
          ) : (
            ''
          )}
        </Container>
      </Card>
    </Accordion>
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
  const { softwareFontSize, iconSizing } = appSettings;
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
    return <RBI.Download style={{ fontSize: iconSizing }} />;
  };

  return (
    <>
      <Row>
        <Col>
          <Button
            variant='dark'
            style={{ marginTop: '1vh' }}
            size={breakpoint === 'xsmall' ? 'sm' : 'lg'}
            onClick={() => handleModalOpen()}
            block
          >
            <Container style={{ color: 'white' }}>
              <Row>
                <Col
                  style={{
                    fontSize: softwareFontSize,
                  }}
                >
                  {downloadName}
                </Col>
                <Col>{type.charAt(0).toUpperCase() + type.slice(1)}_x64</Col>
              </Row>
              <Row>
                <Col>{downloadSize}</Col>
                <Col>{downloads} downloads</Col>
              </Row>
            </Container>
          </Button>
        </Col>
      </Row>

      <SoftwareModal
        title=''
        modalOpen={modalOpen}
        handleModalClose={() => {}}
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
  const appSettings = useContext(AppContext);
  const { fgColorDetail } = appSettings;
  const { titleObject } = props;
  const breakpoint = useCurrentBreakpointName();

  return (
    <Card
      style={{
        backgroundColor: fgColorDetail,
        alignItems: 'center',
        outline: '1px solid gray',
      }}
    >
      <Container>
        <Image
          rounded
          src={titleObject.thumbnail}
          style={{
            width:
              breakpoint === 'xlarge'
                ? titleObject.thumbnailWidth.desktop
                : titleObject.thumbnailWidth.mobile,
          }}
        />
        <strong>{titleObject.title}</strong>
      </Container>
      <Card.Body>
        <Card.Text
          dangerouslySetInnerHTML={{ __html: titleObject.description }}
        ></Card.Text>
        <Card.Img
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
    </Card>
  );
};

const MaintenanceAlert = (props) => {
  const appSettings = useContext(AppContext);
  const { softwareMaintenanceFontSize } = appSettings;
  const { applicationName, maintained = false } = props;
  const [alertOpen, setAlertOpen] = useState(true);
  return (
    <div style={{ fontSize: softwareMaintenanceFontSize }}>
      {maintained ? (
        <Alert
          variant='success'
          dismissible={false}
          onClose={() => setAlertOpen(false)}
          show={alertOpen}
        >
          {`${applicationName} is actively maintained!`}
        </Alert>
      ) : (
        <Alert
          variant='danger'
          dismissible={false}
          onClose={() => setAlertOpen(false)}
          show={alertOpen}
        >
          {`${applicationName} is no longer maintained and will not receive updates!`}
        </Alert>
      )}
    </div>
  );
}

export default SoftwareApplication;
