import React, { useContext, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import { Breakpoint } from 'react-socks';
import { AppContext } from '../../AppContext';
import { StandardSeparator } from '../Utility/Utility';
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
  const appSettings = useContext(AppContext);
  const {
    fgColorDetail,
    appbarFontStyle,
    appbarFontSize
  } = appSettings;
  return (
    <Navbar
      style={{
        fontSize: appbarFontSize,
        backgroundColor: fgColorDetail,
        fontFamily: appbarFontStyle
      }}
      variant='dark'
      fixed='top'
    >
      <Container style={{ textAlign: 'center', height: '4vh' }}>
        <Nav>
          <CustomNavLink href='/'>Home</CustomNavLink>
          <CustomNavLink disabled={true} />
          <CustomNavLink href='/software'>Software</CustomNavLink>
        </Nav>
        <Admin setUserData={setUserData} userData={userData} />
      </Container>
    </Navbar>
  );
};

const MobileView = ({ userData, setUserData }) => {
  const appSettings = useContext(AppContext);
  const {
    fgColorDetail,
    appbarFontStyle,
    appbarFontSize
  } = appSettings;
  return (
    <Navbar
      style={{
        fontSize: appbarFontSize,
        backgroundColor: fgColorDetail,
        fontFamily: appbarFontStyle
      }}
      variant='dark'
    >
      <Container style={{ alignItem: 'center', height: '4vh' }}>
        <CustomNavDropDown>
          <Dropdown.Item href='/' onClick={() => window.open('/', '_self')}>Home</Dropdown.Item>
          <Dropdown.Item href='/' onClick={() => window.open('/software', '_self')}>Software</Dropdown.Item>
        </CustomNavDropDown>
        <Admin setUserData={setUserData} userData={userData} />
      </Container>
    </Navbar>
  );
};

const CustomNavDropDown = props => {
  const appSettings = useContext(AppContext);
  const { textColor } = appSettings;
  const [activeColor, setActiveColor] = useState(textColor);
  return (
    <Nav
      style={{ alignItems: 'center', color: activeColor, cursor: 'default' }}
      onMouseEnter={() => setActiveColor('grey')}
      onMouseLeave={() => setActiveColor(textColor)}
    >
      <Dropdown>
        <Dropdown.Toggle style={{ color: activeColor }} as={Nav.Link}>Navigate</Dropdown.Toggle>
        <Dropdown.Menu>{props.children}</Dropdown.Menu>
      </Dropdown>
    </Nav>
  );
};

const CustomNavLink = props => {
  return (
    <div
      className='defaultMouseOver'
      style={{ color: 'white', padding: '5px', cursor: props.disabled ? '' : 'pointer' }}
      onClick={() => window.open(props.href, '_self')}
    >
      {props.disabled ? <StandardSeparator /> : props.children}
    </div>
  );
};

export default AppBar;
