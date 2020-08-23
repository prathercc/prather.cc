import React, { useEffect, useState, useContext } from 'react';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import { fetchAllSoftware } from '../../../softwareService';
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
      const { data } = await fetchAllSoftware();
      const selectedSoftware = data.find(x => (x.name === name));
      if (selectedSoftware) {
        setApp(selectedSoftware);
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
      {!app && <StandardSpinner style={{ marginTop: '1vh' }} />}
      {
        app && <Tab.Container defaultActiveKey={'Information'}>
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
  const padding = { paddingLeft: '15px', paddingRight: '15px', paddingTop: '3px', paddingBottom: '3px' };
  const { standardBodyFontSize } = useContext(AppContext);

  const CustomLink = ({ keyText, displayText, style }) => {
    return (
      <Nav.Link as={'div'} style={{ ...padding, ...style, fontSize: standardBodyFontSize }} eventKey={keyText}>{displayText}</Nav.Link>
    );
  };

  return (
    <Nav fill variant='tabs' className='tabsNavBar' style={{ marginBottom: '1vh' }}>
      <Nav.Item>
        <CustomLink keyText='Information' displayText='Information' />
      </Nav.Item>
      <Nav.Item>
        <CustomLink keyText='Features' displayText='Features' />
      </Nav.Item>
      <Nav.Item>
        <CustomLink keyText='Video' displayText='Video' />
      </Nav.Item>
      <Nav.Item>
        <CustomLink keyText='Downloads' displayText='Downloads' />
      </Nav.Item>
    </Nav>
  );
};
export default SoftwareApplication;
