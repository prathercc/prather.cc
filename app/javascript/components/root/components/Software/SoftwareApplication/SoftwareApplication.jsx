import React, { useEffect, useState, useContext } from 'react';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import SoftwareCompatibility from '../SoftwareCompatibility/SoftwareCompatibility';
import SoftwareCode from '../SoftwareCode/SoftwareCode';
import { fetchSoftware } from '../../../softwareService';
import { useParams } from 'react-router-dom';
import { fetchFeatures } from '../../../featureService';
import '../Software.css';
import { AppContext } from '../../../AppContext';
import { StandardCard, StandardPage, getThemeColor, StandardSpinner, StandardCardHeader, StandardImageModal } from '../../Utility/Utility';
import InformationTab from './InformationTab';
import FeaturesTab from './FeaturesTab';

function SoftwareApplication({ userData, name }) {
  const appSettings = useContext(AppContext);
  const { standardCardTitleFontSize } = appSettings;
  let { name: paramName } = useParams();
  const [features, setFeatures] = useState(null);
  const [imageModalObj, setImageModalObj] = useState({ open: false, imageLink: '' });
  const [app, setApp] = useState(null);

  useEffect(() => {
    const featureFetch = async () => {
      await fetchFeatures(app.id, setFeatures);
    };
    if (app !== null) {
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
    <StandardPage title={app && app.name}>
      {!app && <StandardSpinner />}
      {
        app && <ViewSwitcher app={app} >
          <Tab.Pane eventKey='Information'>
            <div style={{ fontSize: standardCardTitleFontSize, marginTop: '1vh' }}>Information Tab</div>
            <StandardCardHeader />
            <InformationTab app={app} setImageModalObj={setImageModalObj} />
          </Tab.Pane>
          <Tab.Pane eventKey='Repository'>
            <SoftwareCode style={{ marginTop: '2vh' }} app={app} />
          </Tab.Pane>
          <Tab.Pane eventKey='Downloads'>
            <div style={{ fontSize: standardCardTitleFontSize, marginTop: '1vh' }}>Downloads Tab</div>
            <StandardCardHeader />
            <SoftwareCompatibility
              app={app}
              userData={userData}
            />
          </Tab.Pane>
          <Tab.Pane eventKey='VideoDemo'>
            No video demo available
          </Tab.Pane>
          <Tab.Pane eventKey='Features'>
            <div style={{ fontSize: standardCardTitleFontSize, marginTop: '1vh' }}>Features Tab</div>
            <StandardCardHeader />
            <FeaturesTab style={{ marginTop: '2vh' }} setImageModalObj={setImageModalObj} features={features} userData={userData} app={app} />
          </Tab.Pane>
        </ViewSwitcher>
      }

      <StandardImageModal modalOpen={imageModalObj.open} handleModalClose={() => setImageModalObj({ ...imageModalObj, open: false })} imageLink={imageModalObj.imageLink} />
    </StandardPage>
  );
}

const ViewSwitcher = ({ style, children }) => {
  const BlankKeys = { Information: false, Repository: false, Downloads: false, 'Video Demo': false, Features: false }
  const [activeKey, setActiveKey] = useState({ ...BlankKeys, Information: true });

  const CustomLink = ({ keyBool, keyText, displayText }) => {
    return (
      <Nav.Link as={'div'} className={keyBool || 'defaultMouseOver'} style={keyBool ? { backgroundColor: getThemeColor(1), color: 'black', cursor: 'pointer' } : { cursor: 'pointer' }} onClick={() => setActiveKey({ ...BlankKeys, [keyText]: true })} eventKey={keyText}>{displayText}</Nav.Link>
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
                <CustomLink keyBool={activeKey.Features} keyText='Features' displayText='Features' />
              </Nav.Item>
              <Nav.Item>
                <CustomLink keyBool={activeKey.VideoDemo} keyText='VideoDemo' displayText='Video Demo' />
              </Nav.Item>
              <Nav.Item>
                <CustomLink keyBool={activeKey.Downloads} keyText='Downloads' displayText='Downloads' />
              </Nav.Item>
              <Nav.Item>
                <CustomLink keyBool={activeKey.Repository} keyText='Repository' displayText='Source Code' />
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

export default SoftwareApplication;
