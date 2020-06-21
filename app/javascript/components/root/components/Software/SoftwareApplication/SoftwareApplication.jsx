import React, { useEffect, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { fetchSoftware } from '../../../softwareService';
import { fetchFeatures } from '../../../featureService';
import { StandardCard, StandardPage, getThemeColor, StandardSpinner, StandardImageModal } from '../../Utility/Utility';
import InformationTab from './InformationTab';
import FeaturesTab from './FeaturesTab';
import DownloadsTab from './DownloadsTab';

function SoftwareApplication({ userData, name }) {
  const [features, setFeatures] = useState(null);
  const [imageModalObj, setImageModalObj] = useState({ open: false, imageLink: '' });
  const [app, setApp] = useState(null);

  useEffect(() => {
    const featureFetch = async () => {
      await fetchFeatures(app.id, setFeatures);
    };
    if (app) {
      featureFetch();
    }
  }, [app]);

  useEffect(() => {
    const fetch = async (val) => {
      await fetchSoftware(val, setApp);
    };
    if (name) {
      fetch(name);
    }
  }, [name]);

  return (
    <StandardPage title={app && app.name}>
      {!app && <StandardSpinner />}
      {
        app && <ViewSwitcher app={app} >
          <Tab.Pane eventKey='Information'>
            <InformationTab app={app} setImageModalObj={setImageModalObj} />
          </Tab.Pane>
          <Tab.Pane eventKey='Features'>
            <FeaturesTab style={{ marginTop: '1vh' }} setImageModalObj={setImageModalObj} features={features} userData={userData} app={app} />
          </Tab.Pane>
          <Tab.Pane eventKey='Downloads'>
            <DownloadsTab app={app} userData={userData} />
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

  const CustomLink = ({ keyBool, keyText, displayText, icon }) => {
    return (
      <Nav.Link as={'div'} className={keyBool || 'defaultMouseOver'} style={keyBool ? { backgroundColor: getThemeColor(1), color: 'black', cursor: 'pointer', outline: 0 } : { cursor: 'pointer', outline: 0 }} onClick={() => setActiveKey({ ...BlankKeys, [keyText]: true })} eventKey={keyText}>{icon}<div />{displayText}</Nav.Link>
    )
  }

  return (
    <Tab.Container style={{ ...style }} defaultActiveKey={'Information'}>
      <Row>
        <Col sm={3}>
          <StandardCard style={{ marginTop: '1vh' }}>
            <Nav style={{ minWidth: '100%' }} variant='pills' className='flex-column'>
              <Nav.Item>
                <CustomLink keyBool={activeKey.Information} keyText='Information' displayText='Information' />
              </Nav.Item>
              <Nav.Item>
                <CustomLink keyBool={activeKey.Features} keyText='Features' displayText='Features' />
              </Nav.Item>
              <Nav.Item>
                <CustomLink keyBool={activeKey.Downloads} keyText='Downloads' displayText='Downloads' />
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
