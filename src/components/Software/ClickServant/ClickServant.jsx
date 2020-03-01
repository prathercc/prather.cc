import React, { useContext } from 'react';
import {
  Container,
  Jumbotron,
  Col,
  Row,
  ListGroup,
  Badge
} from 'react-bootstrap';
import clickservantMainView from '../../../images/software/clickservant/clickservantMainView.jpg';
import clickservantIntervalClicker from '../../../images/software/clickservant/clickservantIntervalClicker.jpg';
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
        <SoftwareTitle
          titleObject={{
            title: 'Click-Servant',
            description: appTitleInfo,
            image: `${clickservantMainView}`,
            imageWidth: { desktop: '30vw', mobile: '35vw' },
            thumbnail: `${poico5}`,
            thumbnailWidth: { desktop: '3vw', mobile: '3vw' }
          }}
        />
        <MaintenanceAlert applicationName='Click-Servant' />

        <SoftwareDescription
          descriptionObject={{
            image: `${clickservantIntervalClicker}`,
            imageWidth: { desktop: '25vw', mobile: '35vw' },
            description: desc1,
            content: content1
          }}
        />
      </Jumbotron>
    </Container>
  );
}

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
      <ListGroup.Item action variant='dark'>
        The&nbsp;<em>Main Interval</em>&nbsp;takes a time range in milliseconds.
      </ListGroup.Item>
      <ListGroup.Item action variant='dark'>
        A random interval time will be chosen from the given range and a timer
        will be set.
      </ListGroup.Item>
      <ListGroup.Item action variant='dark'>
        After the timer hits zero, a click will be simulated where the mouse
        cursor is positioned.
      </ListGroup.Item>
      <ListGroup.Item action variant='dark'>
        The&nbsp;<em>'R-CTRL Hot-Key'</em>&nbsp;check box will allow the user
        the stop/start the&nbsp;<strong>Interval Clicker</strong>
        &nbsp;by pressing the Right Ctrl key.
      </ListGroup.Item>
    </ListGroup>
    <Row>
      <Col>
        <strong>Sub-Interval</strong>
      </Col>
    </Row>
    <ListGroup style={{ textAlign: 'left' }}>
      <ListGroup.Item action variant='dark'>
        Toggling&nbsp;<em>'Enable Multiple Clicks'</em>&nbsp;means that upon
        every&nbsp;<em>Main Interval</em>&nbsp;more than one click will be
        simulated.
      </ListGroup.Item>
      <ListGroup.Item action variant='dark'>
        The range of clicks is user supplied, randomly picked and for each of
        these clicks, you may specify another random interval in milliseconds
        before each random click event will fire.
      </ListGroup.Item>
    </ListGroup>
  </Container>
);

export default ClickServant;
