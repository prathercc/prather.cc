import React, { useEffect, useState, useContext } from 'react';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import { fetchSoftware } from '../../../softwareService';
import { fetchFeatures } from '../../../featureService';
import { StandardPage, StandardSpinner, StandardImageModal } from '../../Utility/Utility';
import InformationTab from './InformationTab';
import FeaturesTab from './FeaturesTab';
import DownloadsTab from './DownloadsTab';
import VideoTab from './VideoTab';
import { AppContext } from '../../../AppContext';

function SoftwareApplication({ userData, name, displayAlert }) {
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
      const { data } = await fetchSoftware(name);
      if (data) {
        setApp(data);
      }
      else {
        window.open('/software', '_self')
      }
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
              <InformationTab style={{ marginTop: '1vh' }} app={app} setImageModalObj={setImageModalObj} />
            </Tab.Pane>
            <Tab.Pane eventKey='Features'>
              <FeaturesTab displayAlert={displayAlert} style={{ marginTop: '1vh' }} setImageModalObj={setImageModalObj} features={features} userData={userData} app={app} />
            </Tab.Pane>
            <Tab.Pane eventKey='Video'>
              <VideoTab style={{ marginTop: '1vh' }} app={app} userData={userData} />
            </Tab.Pane>
            <Tab.Pane eventKey='Downloads'>
              <DownloadsTab displayAlert={displayAlert} style={{ marginTop: '1vh' }} app={app} userData={userData} />
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      }
      <StandardImageModal modalOpen={imageModalObj.open} handleModalClose={() => setImageModalObj({ ...imageModalObj, open: false })} imageLink={imageModalObj.imageLink} />
    </StandardPage>
  );
};

const ViewSwitcher = () => {
  const BlankKeys = { Information: false, Downloads: false, Features: false, Video: false };
  const [activeKey, setActiveKey] = useState({ ...BlankKeys, Information: true });
  const padding = { paddingLeft: '15px', paddingRight: '15px', paddingTop: '3px', paddingBottom: '3px' };
  const { standardBodyFontSize } = useContext(AppContext);

  const CustomLink = ({ keyBool, keyText, displayText, icon, style }) => {
    return (
      <Nav.Link as={'div'} className={keyBool ? 'tabsLinkActive' : 'tabsLinkInactive'} style={{ ...padding, ...style, fontSize: standardBodyFontSize }} onClick={() => setActiveKey({ ...BlankKeys, [keyText]: true })} eventKey={keyText}>{icon}<div />{displayText}</Nav.Link>
    );
  };

  return (
    <Nav className='tabsNavBar' style={{ margin: 'auto' }}>
      <Nav.Item className='tabsLeftBorderBlack'>
        <CustomLink style={{ borderBottomLeftRadius: '10px' }} keyBool={activeKey.Information} keyText='Information' displayText='About' />
      </Nav.Item>
      <Nav.Item className='tabsLeftBorderBlack'>
        <CustomLink keyBool={activeKey.Features} keyText='Features' displayText='Features' />
      </Nav.Item>
      <Nav.Item className='tabsLeftBorderBlack'>
        <CustomLink keyBool={activeKey.Video} keyText='Video' displayText='Video' />
      </Nav.Item>
      <Nav.Item className='tabsLeftBorderBlack'>
        <CustomLink style={{ borderBottomRightRadius: '10px' }} keyBool={activeKey.Downloads} keyText='Downloads' displayText='Downloads' />
      </Nav.Item>
    </Nav>
  );
};
export default SoftwareApplication;
