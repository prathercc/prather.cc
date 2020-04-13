import React, { useEffect, useState } from 'react';
import { Container, Col, Row, ListGroup, Spinner } from 'react-bootstrap';
import SoftwareTitle from '../SoftwareTitle/SoftwareTitle';
import SoftwareFeature from '../SoftwareFeature/SoftwareFeature';
import SoftwarePage from '../SoftwarePage/SoftwarePage';
import MaintenanceAlert from '../SoftwarePage/MaintenanceAlert';
import SoftwareCompatibility from '../SoftwareCompatibility/SoftwareCompatibility';
import SoftwareDownloadOption from '../SoftwareCompatibility/SoftwareDownloadOption';
import SoftwareTableRow from '../SoftwareTable/SoftwareTableRow';
import SoftwareCode from '../SoftwareCode/SoftwareCode';
import ListItem from '../SoftwarePage/SoftwareListItem';
import { fetchDownloads } from '../../../downloadService';
import { fetchSoftware } from '../../../softwareService';
import { useParams } from 'react-router-dom';

function SoftwareApplication(props) {
  let { name } = useParams();
  const [downloads, setDownloads] = useState(null);
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
    if (app !== blankApp) {
      fetch();
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
          >
            {downloads === null ? (
              <Container>
                <Spinner animation='border' />
              </Container>
            ) : downloads.length === 0 ? <p>N/A</p> : (
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
    </SoftwarePage>
  );
}

let appTitleInfo =
  'Desktop application that automates mouse and key events at a given interval.';

let desc1 = (
  <Container>
    <Row>
      <Col>
        <strong>Interval Clicker</strong>
      </Col>
    </Row>
    <Row>
      <Col>
        <em>Main Interval</em>&nbsp;and optional&nbsp;<em>Sub-Interval</em>
      </Col>
    </Row>
  </Container>
);
let content1 = (
  <Container>
    <Row>
      <Col>
        <strong>Main Interval & Sub-Interval</strong>
      </Col>
    </Row>
    <ListGroup style={{ textAlign: 'left' }}>
      <ListItem>
        <li>Optional start functionality with Right Ctrl key stroke.</li>
        <li>Mouse event is simulated at cursor location</li>
        <li>Random interval time is generated from the given range.</li>
        <li>Consumes time range in milliseconds.</li>
        <li>Ability to simulate more than one click event.</li>
      </ListItem>
    </ListGroup>
  </Container>
);

let desc2 = (
  <Container>
    <Row>
      <Col>
        <strong>Interval Keyer</strong>
      </Col>
    </Row>
    <Row>
      <Col>
        <em>Main Interval only</em>
      </Col>
    </Row>
  </Container>
);

let content2 = (
  <Container>
    <Row>
      <Col>
        <strong>Main Interval</strong>
      </Col>
    </Row>
    <ListGroup style={{ textAlign: 'left' }}>
      <ListItem>
        <li>Consumes a time range in milliseconds.</li>
        <li>Random interval time is generated from the given range.</li>
        <li>Selected key is simulated as key stroke.</li>
        <li>Optional start functionality with Right Shift key stroke.</li>
      </ListItem>
    </ListGroup>
  </Container>
);

let desc3 = (
  <Container>
    <Row>
      <Col>
        <strong>Profile Save Support</strong>
      </Col>
    </Row>
  </Container>
);

let content3 = (
  <Container>
    <Row>
      <Col>
        <strong>Saving a profile</strong>
      </Col>
    </Row>
    <ListGroup style={{ textAlign: 'left' }}>
      <ListItem>
        <li>
          From the main form, select the&nbsp;<em>Profile</em>&nbsp;drop-down
          button.
        </li>
        <li>
          Click the&nbsp;<em>Save Profile As...</em>&nbsp;option, name your
          profile and save.
        </li>
        <li>
          All of the settings active within the application will be saved and
          output to a '.CSP' file.
        </li>
      </ListItem>
    </ListGroup>
  </Container>
);

let desc4 = (
  <Container>
    <Row>
      <Col>
        <strong>Profile Load Support</strong>
      </Col>
    </Row>
  </Container>
);

let content4 = (
  <Container>
    <Row>
      <Col>
        <strong>Loading a profile</strong>
      </Col>
    </Row>
    <ListGroup style={{ textAlign: 'left' }}>
      <ListItem>
        <li>
          From the main form, select the&nbsp;<em>Profile</em>&nbsp;drop-down
          button.
        </li>
        <li>
          Click the&nbsp;<em>Load Profile</em>&nbsp;option, and select a
          Clicker-Servant Profile file&nbsp;<em>(.CSP)</em>.
        </li>
        <li>
          The settings will be read from the file and loaded into the
          application.
        </li>
      </ListItem>
    </ListGroup>
  </Container>
);

export default SoftwareApplication;
