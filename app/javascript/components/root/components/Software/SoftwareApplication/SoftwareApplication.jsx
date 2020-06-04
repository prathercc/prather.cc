import React, { useEffect, useState, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import SoftwareCompatibility from '../SoftwareCompatibility/SoftwareCompatibility';
import SoftwareCode from '../SoftwareCode/SoftwareCode';
import { fetchDownloads } from '../../../downloadService';
import { fetchSoftware } from '../../../softwareService';
import { useParams } from 'react-router-dom';
import { fetchFeatures } from '../../../featureService';
import '../Software.css';
import { AppContext } from '../../../AppContext';
import { StandardImage, StandardCard, StandardPage, StandardModal, getThemeColor, StandardSpinner } from '../../Utility/Utility';

function SoftwareApplication(props) {
  const { userData } = props;
  let { name } = useParams();
  const [activeView, setActiveView] = useState('Features');
  const [downloads, setDownloads] = useState(null);
  const [features, setFeatures] = useState(null);
  const [imageModalObj, setImageModalObj] = useState({ open: false, imageLink: '' });
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
    <StandardPage title={`Application View - ${app.name}`}>
      <ViewSwitcher style={{ marginBottom: '5vh' }} setActiveView={setActiveView} activeView={activeView} app={app} >
        <Tab.Pane eventKey='Information'>
          <SoftwareTitle
            titleObject={{ title: app.name, description: app.description, image: app.image_link }}
            setImageModalObj={setImageModalObj}
            style={{ marginTop: '1vh' }}
          />
        </Tab.Pane>
        <Tab.Pane eventKey='Repository'>
          <SoftwareCode style={{ marginTop: '2vh' }} repoLink={app.repo_link} />
        </Tab.Pane>
        <Tab.Pane eventKey='Downloads'>
          <SoftwareCompatibility
            style={{ marginTop: '2vh' }}
            app={app}
            setMainDownloads={setDownloads}
            compatibility={{ ...compatibility }}
            userData={userData}
            downloads={downloads}
          />
        </Tab.Pane>
        <Tab.Pane eventKey='Video Demo'>
          Video demo not currently configured!
        </Tab.Pane>
        <Tab.Pane eventKey='Features'>
          <FeaturesBox style={{ marginTop: '2vh' }} setImageModalObj={setImageModalObj} features={features} userData={userData} app={app} />
        </Tab.Pane>
      </ViewSwitcher>
      <ImageModal modalOpen={imageModalObj.open} handleModalClose={() => setImageModalObj({ ...imageModalObj, open: false })} imageLink={imageModalObj.imageLink} />
    </StandardPage>
  );
}

const FeaturesBox = ({ features, setImageModalObj, userData, style, app }) => {
  const [activeFeature, setActiveFeature] = useState(0);
  const leftButtonActive = activeFeature > 0;
  const rightButtonActive = activeFeature < features?.length - 1;

  const NavButtons = () => {
    return (
      <Container>
        <Row style={{ maxWidth: '75%', margin: 'auto', marginTop: '1vh', marginBottom: '1vh' }}>
          <Col>
            <StandardCard style={{ color: !leftButtonActive && 'gray', minWidth: '25%' }} className={leftButtonActive && 'defaultImageNudge'} onClick={() => leftButtonActive && setActiveFeature(activeFeature - 1)}>Previous</StandardCard>
          </Col>
          <Col >
            <StandardCard style={{ color: !rightButtonActive && 'gray', minWidth: '25%' }} className={rightButtonActive && 'defaultImageNudge'} onClick={() => rightButtonActive && setActiveFeature(activeFeature + 1)}>Next</StandardCard>
          </Col>
        </Row>
      </Container>
    )
  }
  return (
    <div style={{ ...style }}>
      {
        features && <SoftwareFeature
          NavButtons={<NavButtons />}
          setImageModalObj={setImageModalObj}
          index={activeFeature + 1}
          userData={userData}
          descriptionObject={{
            image: features[activeFeature].image_link,
            title: features[activeFeature].title,
            description: features[activeFeature].description,
            content_title: features[activeFeature].content_title,
            content_description: features[activeFeature].content_description,
            id: features[activeFeature].id,
            application_name: features[activeFeature].application_name,
          }}
        />
      }
      {
        userData && <Button
          onClick={() => window.open(`/software/admin/feature/new/${app.name}`, '_self')}
          style={{ marginTop: '1vh' }}
          block
          variant='warning'
        >
          Add Feature
        </Button>
      }
    </div>
  )
}

const ViewSwitcher = ({ style, children }) => {
  return (
    <Tab.Container style={{ ...style }} defaultActiveKey={'Information'}>
      <Row>
        <Col sm={3}>
          <StandardCard>
            <Nav style={{ minWidth: '100%' }} variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="Information">Information</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="Repository">Repository</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="Downloads">Downloads</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="Video Demo">Video Demo</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="Features">Features</Nav.Link>
              </Nav.Item>
            </Nav>
          </StandardCard>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            {children}
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>

  )
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

const SoftwareFeature = ({ userData, descriptionObject, index, setImageModalObj, NavButtons }) => {
  const appSettings = useContext(AppContext);
  const { softwareFontSize } = appSettings;

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
          <div style={{ color: getThemeColor(0.8), fontSize: softwareFontSize }}>Feature #{index}</div>
        </Col>
      </Row>
    </Container>

  return (
    <Container>
      <Row>
        <Col>
          <StandardImage
            className='defaultImageNudge'
            src={descriptionObject.image}
            onClick={() => setImageModalObj({ open: true, imageLink: descriptionObject.image })}
            style={{ maxWidth: '85%', cursor: 'pointer', margin: 'auto', marginBottom: '1vh' }}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          {NavButtons}
        </Col>
      </Row>
      <Row>
        <Col style={{ display: 'flex' }}>
          <div style={{ margin: 'auto' }}>
            {cardTitle}
          </div>
        </Col>
      </Row>
      <Row style={{ marginTop: '1vh' }}>
        <Col>
          <div style={{ margin: 'auto' }} dangerouslySetInnerHTML={{ __html: descriptionObject.content_description }} />
        </Col>
      </Row>

      {
        userData && <Button style={{ fontSize: softwareFontSize }} block variant='warning'
          onClick={() => window.open(`/software/admin/feature/edit/${descriptionObject.application_name}/${descriptionObject.id}`, '_self')}>
          Edit </Button>
      }
    </Container>
  );
};

const SoftwareTitle = ({ titleObject, setImageModalObj, style }) => {
  return (
    <>
      <StandardImage
        className='defaultImageNudge'
        style={{
          cursor: 'pointer',
          maxWidth: '85%',
          margin: 'auto',
          marginBottom: '3vh',
          ...style
        }}
        onClick={() => setImageModalObj({ open: true, imageLink: titleObject.image })}
        variant='top'
        src={titleObject.image}
      />
      <div style={{ margin: 'auto', maxWidth: '85%' }} dangerouslySetInnerHTML={{ __html: titleObject.description }} />
    </>
  );
};

export default SoftwareApplication;
