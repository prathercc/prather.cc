import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Breakpoint } from 'react-socks';
import { StandardCard, getThemeColor } from '../Utility/Utility';
import Admin from './Admin';

function AppBar({ userData, setUserData }) {
  return (
    <>
      <Breakpoint small down>
        <MobileView setUserData={setUserData} userData={userData} />
      </Breakpoint>
      <Breakpoint medium up>
        <DesktopView setUserData={setUserData} userData={userData} />
      </Breakpoint>
    </>
  );
}

const DesktopView = ({ userData, setUserData }) => {
  return (
    <StandardCard>
      <Nav style={{ minWidth: '100%' }}>
        <Container style={{ minWidth: '85%' }}>
          <Row>
            <Col style={{ marginTop: '1vh' }}>
              <Nav.Link style={{ outline: 0, display: 'inline' }} className='defaultMouseOver' eventKey='Home'>Home</Nav.Link>
              <span style={{ color: getThemeColor(1) }}>/</span>
              <Nav.Link style={{ outline: 0, display: 'inline' }} className='defaultMouseOver' eventKey='Software'>Software</Nav.Link>
            </Col>
            <Col>
              <Nav.Link style={{ outline: 0 }}><Admin setUserData={setUserData} userData={userData} /></Nav.Link>
            </Col>
          </Row>
        </Container>
      </Nav>
    </StandardCard>
  );
};

const MobileView = ({ userData, setUserData }) => {
  return (
    <StandardCard>
      <Nav style={{ minWidth: '100%' }}>
        <Container>
          <Row>
            <Col style={{ textAlign: 'left' }}>
              <Dropdown>
                <Dropdown.Toggle style={{ color: 'white', outline: 0 }} as={Nav.Link}>Navigate</Dropdown.Toggle>
                <Dropdown.Menu>
                  <Nav.Link style={{ outline: 0, color: 'black' }} eventKey='Home'>Home</Nav.Link>
                  <Nav.Link style={{ outline: 0, color: 'black' }} eventKey='Software'>Software</Nav.Link>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col style={{ textAlign: 'right' }}>
              <Nav.Link style={{ outline: 0 }}><Admin setUserData={setUserData} userData={userData} /></Nav.Link>
            </Col>
          </Row>
        </Container>
      </Nav>
    </StandardCard>
  );
};

export default AppBar;
