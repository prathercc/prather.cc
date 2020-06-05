import React, { useEffect, useState, useContext } from 'react';
import Container from 'react-bootstrap/Container';
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
import { StandardImage, StandardCard, StandardPage, StandardModal, getThemeColor, StandardSpinner, StandardButton } from '../../Utility/Utility';

function SoftwareApplication({ userData, name }) {
  let { name: paramName } = useParams();
  const [downloads, setDownloads] = useState(null);
  const [features, setFeatures] = useState(null);
  const [imageModalObj, setImageModalObj] = useState({ open: false, imageLink: '' });
  const [app, setApp] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      await fetchDownloads(app.id, setDownloads);
    };
    const featureFetch = async () => {
      await fetchFeatures(app.id, setFeatures);
    };
    if (app !== null) {
      fetch();
      featureFetch();
    }
  }, [app]);

  useEffect(() => {
    const fetch = async (val) => {
      await fetchSoftware(val, setApp);
    };
    if (name) {
      fetch(name);
    } else {
      fetch(paramName);
    }
  }, []);

  return (
    <StandardPage style={{ marginTop: '8vh' }} title={app && app.name}>
      {!app && <StandardSpinner />}
      {
        app && <ViewSwitcher app={app} >
          <Tab.Pane eventKey='Information'>
            <SoftwareTitle
              app={app}
              setImageModalObj={setImageModalObj}
              style={{ marginTop: '1vh' }}
            />
          </Tab.Pane>
          <Tab.Pane eventKey='Repository'>
            <SoftwareCode style={{ marginTop: '2vh' }} app={app} />
          </Tab.Pane>
          <Tab.Pane eventKey='Downloads'>
            <SoftwareCompatibility
              style={{ marginTop: '2vh' }}
              app={app}
              setMainDownloads={setDownloads}
              userData={userData}
              downloads={downloads}
            />
          </Tab.Pane>
          <Tab.Pane eventKey='VideoDemo'>
            Video demo not currently configured!
          </Tab.Pane>
          <Tab.Pane eventKey='Features'>
            <FeaturesBox style={{ marginTop: '2vh' }} setImageModalObj={setImageModalObj} features={features} userData={userData} app={app} />
          </Tab.Pane>
        </ViewSwitcher>
      }

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
            <StandardButton isActive={leftButtonActive} style={{ minWidth: '25%' }} onClick={() => setActiveFeature(activeFeature - 1)}>
              Previous
            </StandardButton>
          </Col>
          <Col >
            <StandardButton isActive={rightButtonActive} style={{ minWidth: '25%' }} onClick={() => setActiveFeature(activeFeature + 1)}>
              Next
            </StandardButton>
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
        userData && <StandardButton
          onClick={() => window.open(`/software/admin/feature/new/${app.name}`, '_self')}
          style={{ marginTop: '1vh' }}
        >
          Add Feature
        </StandardButton>
      }
    </div>
  )
}

const ViewSwitcher = ({ style, children }) => {
  const BlankKeys = { Information: false, Repository: false, Downloads: false, 'Video Demo': false, Features: false }
  const [activeKey, setActiveKey] = useState({ ...BlankKeys, Information: true });

  const CustomLink = ({ keyBool, keyText, displayText }) => {
    return (
      <Nav.Link className={keyBool || 'defaultMouseOver'} style={keyBool ? { backgroundColor: getThemeColor(1), color: 'black' } : {}} onClick={() => setActiveKey({ ...BlankKeys, [keyText]: true })} eventKey={keyText}>{displayText}</Nav.Link>
    )
  }

  return (
    <Tab.Container style={{ ...style }} defaultActiveKey={'Information'}>
      <Row>
        <Col sm={3}>
          <StandardCard>
            <Nav style={{ minWidth: '100%' }} variant='pills' className='flex-column'>
              <Nav.Item>
                <CustomLink keyBool={activeKey.Information} keyText='Information' displayText='Information' />
              </Nav.Item>
              <Nav.Item>
                <CustomLink keyBool={activeKey.Repository} keyText='Repository' displayText='Repository' />
              </Nav.Item>
              <Nav.Item>
                <CustomLink keyBool={activeKey.Downloads} keyText='Downloads' displayText='Downloads' />
              </Nav.Item>
              <Nav.Item>
                <CustomLink keyBool={activeKey.VideoDemo} keyText='VideoDemo' displayText='Video Demo' />
              </Nav.Item>
              <Nav.Item>
                <CustomLink keyBool={activeKey.Features} keyText='Features' displayText='Features' />
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
  const RawButton = <StandardButton style={{ minWidth: '25%' }} onClick={() => window.open(imageLink)}>View Raw Image</StandardButton>
  return (
    <StandardModal buttons={RawButton} modalOpen={modalOpen} handleModalClose={handleModalClose}>
      <StandardImage src={imageLink} style={{ maxWidth: '85%' }} />
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
      <StandardCard style={{ marginTop: '1vh' }}>
        <Row>
          <Col style={{ display: 'flex' }}>
            <div style={{ margin: 'auto' }}>
              {cardTitle}
            </div>
          </Col>
        </Row>
        <Row style={{ marginTop: '1vh' }}>
          <Col>
            <div dangerouslySetInnerHTML={{ __html: descriptionObject.content_description }} />
          </Col>
        </Row>
      </StandardCard>
      {
        userData &&
        <StandardButton style={{ marginTop: '1vh' }}
          onClick={() => window.open(`/software/admin/feature/edit/${descriptionObject.application_name}/${descriptionObject.id}`, '_self')}>
          Edit </StandardButton>
      }
    </Container>
  );
};

const SoftwareTitle = ({ setImageModalObj, style, app: { image_link, description } }) => {
  return (
    <>
      <StandardImage
        className='defaultImageNudge'
        style={{
          cursor: 'pointer',
          maxWidth: '65%',
          margin: 'auto',
          marginBottom: '3vh',
          ...style
        }}
        onClick={() => setImageModalObj({ open: true, imageLink: image_link })}
        variant='top'
        src={image_link}
      />
      <div style={{ margin: 'auto', maxWidth: '85%' }} dangerouslySetInnerHTML={{ __html: description }} />
    </>
  );
};

export default SoftwareApplication;
