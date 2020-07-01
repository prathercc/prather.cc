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
import CodeTab from './CodeTab';
import VideoTab from './VideoTab';

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
    const fetch = async () => {
      await fetchSoftware(name, setApp);
    };
    setApp(null);
    if (name) {
      fetch();
    }
  }, [name]);

  return (
    <StandardPage title={app && app.name}>
      {!app && <StandardSpinner />}
      {
        app &&
        <Tab.Container defaultActiveKey={'Information'}>
          <ViewSwitcher />
          <Tab.Content>
            <Tab.Pane eventKey='Information'>
              <InformationTab style={{ marginTop: '2vh' }} app={app} setImageModalObj={setImageModalObj} />
            </Tab.Pane>
            <Tab.Pane eventKey='Features'>
              <FeaturesTab style={{ marginTop: '2vh' }} setImageModalObj={setImageModalObj} features={features} userData={userData} app={app} />
            </Tab.Pane>
            <Tab.Pane eventKey='Video'>
              <VideoTab style={{ marginTop: '2vh' }} app={app} userData={userData} />
            </Tab.Pane>
            <Tab.Pane eventKey='Downloads'>
              <DownloadsTab style={{ marginTop: '2vh' }} app={app} userData={userData} />
            </Tab.Pane>
            <Tab.Pane eventKey='Code'>
              <CodeTab style={{ marginTop: '2vh' }} app={app} userData={userData} />
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      }
      <StandardImageModal modalOpen={imageModalObj.open} handleModalClose={() => setImageModalObj({ ...imageModalObj, open: false })} imageLink={imageModalObj.imageLink} />
    </StandardPage>
  );
}

const ViewSwitcher = ({ style, children, app }) => {
  const BlankKeys = { Information: false, Repository: false, Downloads: false, 'Video Demo': false, Features: false, Compatibility: false, Code: false, Video: false }
  const [activeKey, setActiveKey] = useState({ ...BlankKeys, Information: true });

  const CustomLink = ({ keyBool, keyText, displayText, icon }) => {
    return (
      <Nav.Link as={'div'} className={keyBool || 'defaultMouseOver'} style={keyBool ? { backgroundColor: getThemeColor(1), color: 'black', cursor: 'pointer', outline: 0, padding: '12px' } : { cursor: 'pointer', outline: 0, padding: '12px' }} onClick={() => setActiveKey({ ...BlankKeys, [keyText]: true })} eventKey={keyText}>{icon}<div />{displayText}</Nav.Link>
    )
  }

  return (
    <StandardCard style={{ maxWidth: 'max-content', margin: 'auto', outline: `1px solid ${getThemeColor(0.1)}` }}>
      <Nav>
        <Nav.Item>
          <CustomLink keyBool={activeKey.Information} keyText='Information' displayText='About' />
        </Nav.Item>
        <Nav.Item>
          <CustomLink keyBool={activeKey.Features} keyText='Features' displayText='Features' />
        </Nav.Item>
        <Nav.Item>
          <CustomLink keyBool={activeKey.Video} keyText='Video' displayText='Video' />
        </Nav.Item>
        <Nav.Item>
          <CustomLink keyBool={activeKey.Downloads} keyText='Downloads' displayText='Downloads' />
        </Nav.Item>
        <Nav.Item>
          <CustomLink keyBool={activeKey.Code} keyText='Code' displayText='Code' />
        </Nav.Item>
      </Nav>
    </StandardCard>
  )
}
export default SoftwareApplication;
