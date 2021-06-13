import React, { useEffect, useState } from 'react';
import { fetchAllSoftware } from '../../../softwareService';
import { fetchFeatures } from '../../../featureService';
import { StandardPage, StandardImageModal, getThemeColor, StandardLinkModal, StandardIconButton } from '../../Utility/Utility';
import InformationTab from './InformationTab';
import FeaturesTab from './FeaturesTab';
import DownloadsTab from './DownloadsTab';
import VideoTab from './VideoTab';
import { Spin, Tabs, Row, Col } from 'antd';
import { GithubFilled, EditOutlined } from '@ant-design/icons';
import SoftwareModal from './SoftwareModal';

function SoftwareApplication({ userData, name }) {
  const [features, setFeatures] = useState(null);
  const [imageModalObj, setImageModalObj] = useState({ open: false, imageLink: '' });
  const [app, setApp] = useState(null);
  const [repoModalOpen, setRepoModalOpen] = useState(false);
  const [softwareModalOpen, setSoftwareModalOpen] = useState(false);

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
        window.open('/', '_self')
      }
    };
    setApp(null);
    if (name) {
      fetch();
    }
  }, [name]);

  return (
    <StandardPage title={app && app.name}>
      {!app && <Spin style={{ marginTop: '1vh' }} />}
      {app && <><Tabs defaultActiveKey='Information' centered>
        <Tabs.TabPane tab='Information' key='Information'><InformationTab app={app} style={{ marginBottom: '2vh' }} /></Tabs.TabPane>
        <Tabs.TabPane tab='Features' key='Features'><FeaturesTab setImageModalObj={setImageModalObj} features={features} userData={userData} app={app} /></Tabs.TabPane>
        <Tabs.TabPane tab='Video' key='Video'><VideoTab app={app} userData={userData} /></Tabs.TabPane>
        <Tabs.TabPane tab='Downloads' key='Downloads'><DownloadsTab app={app} userData={userData} /></Tabs.TabPane>
      </Tabs>
        <StandardImageModal modalOpen={imageModalObj.open} handleModalClose={() => setImageModalObj({ ...imageModalObj, open: false })} imageLink={imageModalObj.imageLink} />
        <Row style={{ marginTop: '1vh' }}>
          <Col xs={12}>
            <StandardIconButton onClick={() => setSoftwareModalOpen(true)} icon={<EditOutlined />} toolTip={`Edit ${app?.name}`} />
          </Col>
          <Col xs={12}>
            <StandardIconButton onClick={() => setRepoModalOpen(true)} icon={<GithubFilled />} toolTip={`${app?.name} Repository`} />
          </Col>
        </Row>
        <StandardLinkModal link={app?.repo_link} handleModalClose={() => setRepoModalOpen(false)} modalOpen={repoModalOpen}>
          Open the official <span style={{ color: getThemeColor(1) }}>{app?.name}</span> GitHub repository?
      </StandardLinkModal>
      <SoftwareModal newSoftware={false} modalOpen={softwareModalOpen} setModalOpen={setSoftwareModalOpen} software={app} setSoftware={setApp} />
      </>
      }
    </StandardPage>
  );
};

export default SoftwareApplication;
