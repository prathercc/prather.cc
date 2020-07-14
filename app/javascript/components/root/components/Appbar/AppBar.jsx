import React, { useContext } from 'react';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Breakpoint } from 'react-socks';
import { getThemeColor } from '../Utility/Utility';
import Admin from './Admin';
import { AppContext } from '../../AppContext';

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
  const appSettings = useContext(AppContext);
  const { appbarFontSize, bgColor } = appSettings;
  return (
    <div style={{ backgroundColor: bgColor, position: 'relative' }}>
      <Nav style={{ minWidth: '100%', fontSize: appbarFontSize, backgroundColor: getThemeColor(0.5) }}>
        <Container style={{ minWidth: '85%' }}>
          <Row>
            <Col style={{ margin: 'auto' }}>
              <Nav.Link as={'div'} style={{ outline: 0, display: 'inline', cursor: 'pointer' }} className='defaultMouseOver' eventKey='Home'>Home</Nav.Link>
              <span style={{ color: getThemeColor(1) }}>/</span>
              <Nav.Link as={'div'} style={{ outline: 0, display: 'inline', cursor: 'pointer' }} className='defaultMouseOver' eventKey='Software'>Software</Nav.Link>
            </Col>
            <Col style={{ margin: 'auto' }}>
              <Nav.Link as={'div'} style={{ outline: 0, maxWidth: 'max-content', margin: 'auto' }}><Admin setUserData={setUserData} userData={userData} /></Nav.Link>
            </Col>
          </Row>
        </Container>
      </Nav>
    </div>
  );
};

const MobileView = ({ userData, setUserData }) => {
  const appSettings = useContext(AppContext);
  const { appbarFontSize, bgColor } = appSettings;
  return (
    <div style={{ backgroundColor: bgColor, position: 'relative' }}>
      <Nav style={{ minWidth: '100%', fontSize: appbarFontSize, backgroundColor: getThemeColor(0.5) }}>
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
    </div>
  );
};

export default AppBar;
