import React, { useContext } from 'react';
import { Container, Jumbotron, Col, Row, ListGroup } from 'react-bootstrap';
import clickservantMainView from '../../../images/software/clickservant/clickservantMainView.jpg';
import clickservantIntervalClicker from '../../../images/software/clickservant/clickservantIntervalClicker.jpg';
import clickservantIntervalKeyer from '../../../images/software/clickservant/clickservantIntervalKeyer.jpg';
import clickservantSave from '../../../images/software/clickservant/clickservantSave.jpg';
import clickservantLoad from '../../../images/software/clickservant/clickservantLoad.jpg';
import poico5 from '../../../images/software/clickservant/poico5.png';
import SoftwareTitle from '../SoftwareTitle';
import SoftwareDescription from '../SoftwareDescription';
import MaintenanceAlert from '../MaintenanceAlert';
import { AppContext } from '../../../AppContext';

function ClickServant() {
  const appSettings = useContext(AppContext);
  const { fgColor } = appSettings;
  return (
    <Container>
      <Jumbotron
        bg='dark'
        style={{
          backgroundColor: fgColor,
          marginTop: '5vh'
        }}
      >
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

        <SoftwareDescription
          descriptionObject={{
            image: `${clickservantIntervalClicker}`,
            imageWidth: { desktop: '25vw', mobile: '50vw' },
            description: desc1,
            content: content1
          }}
        />

        <SoftwareDescription
          descriptionObject={{
            image: `${clickservantIntervalKeyer}`,
            imageWidth: { desktop: '20vw', mobile: '50vw' },
            description: desc2,
            content: content2
          }}
        />

        <SoftwareDescription
          descriptionObject={{
            image: `${clickservantSave}`,
            imageWidth: { desktop: '25vw', mobile: '50vw' },
            description: desc3,
            content: content3
          }}
        />

        <SoftwareDescription
          descriptionObject={{
            image: `${clickservantLoad}`,
            imageWidth: { desktop: '25vw', mobile: '50vw' },
            description: desc4,
            content: content4
          }}
        />
      </Jumbotron>
    </Container>
  );
}
const ListItem = props => {
  return (
    <ListGroup.Item style={{ cursor: 'default' }} action variant='dark'>
      {props.children}
    </ListGroup.Item>
  );
};

let appTitleInfo = (
  <Container>
    <strong>Click-Servant</strong>&nbsp;is a&nbsp;
    <a href='https://docs.microsoft.com/en-us/cpp/dotnet' rel='nofollow'>
      C++/CLI
    </a>
    &nbsp;application that is used to automate mouse clicks &amp; key presses.
    This application supports profile saving/loading so that preferred settings
    may be shared or used again with ease.
  </Container>
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
        The&nbsp;<strong>Interval Clicker</strong>&nbsp;has two main features,
        the&nbsp;<em>Main Interval</em>&nbsp;and an optional&nbsp;
        <em>Sub-Interval</em>.
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
      <ListItem>
        The&nbsp;<em>Main Interval</em>&nbsp;takes a time range in milliseconds.
      </ListItem>
      <ListItem>
        A random interval time will be chosen from the given range and a timer
        will be set.
      </ListItem>
      <ListItem>
        After the timer hits zero, a click will be simulated where the mouse
        cursor is positioned.
      </ListItem>
      <ListItem>
        The&nbsp;<em>'R-CTRL Hot-Key'</em>&nbsp;check box will allow the user
        the stop/start the&nbsp;<strong>Interval Clicker</strong>
        &nbsp;by pressing the Right Ctrl key.
      </ListItem>
    </ListGroup>
    <Row>
      <Col>
        <strong>Sub-Interval</strong>
      </Col>
    </Row>
    <ListGroup style={{ textAlign: 'left' }}>
      <ListItem>
        Toggling&nbsp;<em>'Enable Multiple Clicks'</em>&nbsp;means that upon
        every&nbsp;<em>Main Interval</em>&nbsp;more than one click will be
        simulated.
      </ListItem>
      <ListItem>
        The range of clicks is user supplied, randomly picked and for each of
        these clicks, you may specify another random interval in milliseconds
        before each random click event will fire.
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
        The&nbsp;<strong>Interval Keyer</strong>&nbsp;currently supports only
        a&nbsp;<em>Main Interval</em>.
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
        The&nbsp;<em>Main Interval</em>&nbsp;takes a time range in milliseconds.
      </ListItem>
      <ListItem>
        A random interval time will be chosen from the given range and a timer
        will be set.
      </ListItem>
      <ListItem>
        After the timer hits zero, a key press with the selected key will be
        simulated.
      </ListItem>
      <ListItem>
        The&nbsp;<em>'R-SHIFT Hot-Key'</em>&nbsp;check box will allow the user
        the stop/start the&nbsp;<strong>Interval Keyer</strong>&nbsp;by pressing
        the Right Shift key.
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
