import React, { useEffect, useState } from 'react';
import { Container, Spinner, Button } from 'react-bootstrap';
import SoftwareTitle from '../SoftwareTitle/SoftwareTitle';
import SoftwareFeature from '../SoftwareFeature/SoftwareFeature';
import SoftwarePage from '../SoftwarePage/SoftwarePage';
import MaintenanceAlert from '../SoftwarePage/MaintenanceAlert';
import SoftwareCompatibility from '../SoftwareCompatibility/SoftwareCompatibility';
import SoftwareDownloadOption from '../SoftwareCompatibility/SoftwareDownloadOption';
import SoftwareCode from '../SoftwareCode/SoftwareCode';
import { fetchDownloads } from '../../../downloadService';
import { fetchSoftware } from '../../../softwareService';
import { useParams } from 'react-router-dom';
import { fetchFeatures } from '../../../featureService';

function SoftwareApplication(props) {
  const { userData } = props;
  let { name } = useParams();
  const [downloads, setDownloads] = useState(null);
  const [features, setFeatures] = useState(null);
  console.log(features);
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
      await fetchDownloads(app.name, setDownloads);
    };
    const featureFetch = async () => {
      await fetchFeatures(app.name, setFeatures);
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
            appName={app.name}
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
            window.open(`/software/admin/feature/new/${name}`, '_self')
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
                  application_name: feature.application_name
                }}
              />
            );
          })
        : ''}
    </SoftwarePage>
  );
}
export default SoftwareApplication;
