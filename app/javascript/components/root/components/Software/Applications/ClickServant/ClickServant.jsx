import React from 'react';
import { Container, Col, Row, ListGroup } from 'react-bootstrap';
import clickservantMainView from '../../../../images/software/clickservant/clickservantMainView.jpg';
import clickservantIntervalClicker from '../../../../images/software/clickservant/clickservantIntervalClicker.jpg';
import clickservantIntervalKeyer from '../../../../images/software/clickservant/clickservantIntervalKeyer.jpg';
import clickservantSave from '../../../../images/software/clickservant/clickservantSave.jpg';
import clickservantLoad from '../../../../images/software/clickservant/clickservantLoad.jpg';
import poico5 from '../../../../images/software/clickservant/poico5.png';
import SoftwareTitle from '../../SoftwareTitle/SoftwareTitle';
import SoftwareFeature from '../../SoftwareFeature/SoftwareFeature';
import SoftwarePage from '../../SoftwarePage/SoftwarePage';
import MaintenanceAlert from '../../SoftwarePage/MaintenanceAlert';
import SoftwareCompatibility from '../../SoftwareCompatibility/SoftwareCompatibility';
import SoftwareDownloadOption from '../../SoftwareCompatibility/SoftwareDownloadOption';
import SoftwareTableRow from '../../SoftwareTable/SoftwareTableRow';
import SoftwareCode from '../../SoftwareCode/SoftwareCode';
import ListItem from '../../SoftwarePage/SoftwareListItem';

function ClickServant(props) {
  const { sample = false } = props;
  const compatibility = {
    windows: false,
    linux: false,
    mac: false,
    android: false,
    ios: false
  };

  return (
    <>
      {sample ? (
        <SoftwareTableRow
          applicationName='Click-Servant'
          icon={`${poico5}`}
          pageLink='/software/Click-Servant'
          language='C++/CLI'
          compatibility={{...compatibility, windows:true}}
        />
      ) : (
        <SoftwarePage>
          <MaintenanceAlert applicationName='Click-Servant' />
          <SoftwareTitle
            titleObject={{
              title: 'Click-Servant',
              description: appTitleInfo,
              image: `${clickservantMainView}`,
              imageWidth: { desktop: '30vw', mobile: '50vw' },
              thumbnail: `${poico5}`,
              thumbnailWidth: { desktop: '3vw', mobile: '6vw' }
            }}
          />
          <SoftwareCompatibility compatibility={{ ...compatibility, windows: true }}>
            {/* Will want to map the SoftwareDownloadOptions here from a json obj containing the downloads + their info */}
            <SoftwareDownloadOption downloadLink='/' downloadName='ClickServant.exe' type='windows' downloadSize='2.3 mb' downloads={55} />
          </SoftwareCompatibility>

          <SoftwareCode repoLink='https://github.com/aaprather/Click-Servant' />

          <SoftwareFeature
            descriptionObject={{
              image: `${clickservantIntervalClicker}`,
              imageWidth: { desktop: '25vw', mobile: '50vw' },
              description: desc1,
              content: content1
            }}
          />

          <SoftwareFeature
            descriptionObject={{
              image: `${clickservantIntervalKeyer}`,
              imageWidth: { desktop: '20vw', mobile: '50vw' },
              description: desc2,
              content: content2
            }}
          />

          <SoftwareFeature
            descriptionObject={{
              image: `${clickservantSave}`,
              imageWidth: { desktop: '25vw', mobile: '50vw' },
              description: desc3,
              content: content3
            }}
          />

          <SoftwareFeature
            descriptionObject={{
              image: `${clickservantLoad}`,
              imageWidth: { desktop: '25vw', mobile: '50vw' },
              description: desc4,
              content: content4
            }}
          />
        </SoftwarePage>
      )}
    </>
  );
}

let appTitleInfo = (
    'Desktop application that automates mouse &amp; key events at a given interval.'
);

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
        <strong>Main Interval</strong>
      </Col>
    </Row>
    <ListGroup style={{ textAlign: 'left' }}>
      <ListItem>Consumes time range in milliseconds.</ListItem>
      <ListItem>
        Random interval time is generated from the given range.
      </ListItem>
      <ListItem>Mouse event is simulated at cursor location</ListItem>
      <ListItem>
        Optional start functionality with Right Ctrl key stroke.
      </ListItem>
    </ListGroup>
    <Row>
      <Col>
        <strong>Sub-Interval</strong>
      </Col>
    </Row>
    <ListGroup style={{ textAlign: 'left' }}>
      <ListItem>
        Simulates more than one event on the&nbsp;<em>Main Interval </em>event.
      </ListItem>
      <ListItem>
        Click range supplied by user determines the number of simulated mouse
        events.
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
      <ListItem>Consumes a time range in milliseconds.</ListItem>
      <ListItem>
        Random interval time is generated from the given range.
      </ListItem>
      <ListItem>Selected is simulated as key stroke.</ListItem>
      <ListItem>
        Optional start functionality with Right Shift key stroke.
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
        From the main form, select the&nbsp;<em>Profile</em>&nbsp;drop-down
        button.
      </ListItem>
      <ListItem>
        Click the&nbsp;<em>Save Profile As...</em>&nbsp;option, name your
        profile and save.
      </ListItem>
      <ListItem>
        All of the settings active within the application will be saved and
        output to a '.CSP' file.
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
        From the main form, select the&nbsp;<em>Profile</em>&nbsp;drop-down
        button.
      </ListItem>
      <ListItem>
        Click the&nbsp;<em>Load Profile</em>&nbsp;option, and select a
        Clicker-Servant Profile file&nbsp;<em>(.CSP)</em>.
      </ListItem>
      <ListItem>
        The settings will be read from the file and loaded into the application.
      </ListItem>
    </ListGroup>
  </Container>
);

export default ClickServant;
