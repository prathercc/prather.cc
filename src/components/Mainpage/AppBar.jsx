import React, { useContext, useState } from 'react';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import { Breakpoint } from 'react-socks';
import { AppContext } from '../../AppContext';
import Logo from '../Logo/Logo';

function AppBar() {
  return (
    <>
      <Breakpoint large down>
        <MobileView />
      </Breakpoint>
      <Breakpoint xlarge up>
        <DesktopView />
      </Breakpoint>
    </>
  );
}

const DesktopView = () => {
  const appSettings = useContext(AppContext);
  const { fgColorDetail, fontStyle } = appSettings;
  const imageObj = {
    splatWidth: '4vw'
  };
  return (
    <Navbar
      style={{
        fontSize: 'calc(10px + 2vmin)',
        backgroundColor: fgColorDetail,
        fontFamily: fontStyle
      }}
      variant='dark'
      fixed='top'
    >
      <Nav style={{ alignItems: 'center' }}>
        <CustomNavLink href='/'>Home</CustomNavLink>
        <CustomNavLink disabled={true}> /</CustomNavLink>
        <CustomNavLink href='/software'>Software</CustomNavLink>
      </Nav>
      <Navbar.Brand style={{ right: '1vw', position: 'fixed' }}>
        <Logo imageObj={{ ...imageObj, alwaysFast: true }} />
        <Navbar.Text style={{ color: 'white', cursor: 'default' }}>
          <strong>prather.cc</strong>
        </Navbar.Text>
      </Navbar.Brand>
    </Navbar>
  );
};

const MobileView = () => {
  const appSettings = useContext(AppContext);
  const { fgColorDetail, fontStyle } = appSettings;
  const imageObj = {
    splatWidth: '10vw'
  };
  return (
    <Navbar
      style={{
        fontSize: 'calc(10px + 2vmin)',
        backgroundColor: fgColorDetail,
        fontFamily: fontStyle
      }}
      variant='dark'
      fixed='top'
    >
      <CustomNavDropDown>
        <Dropdown.Item href='/'>Home</Dropdown.Item>
        <Dropdown.Item href='/software'>Software</Dropdown.Item>
      </CustomNavDropDown>
      <Navbar.Brand style={{ right: '1vw', position: 'fixed' }}>
        <Logo imageObj={{ ...imageObj, alwaysFast: true }} />
        <Navbar.Text style={{ color: 'white', cursor: 'default' }}>
          <strong>prather.cc</strong>
        </Navbar.Text>
      </Navbar.Brand>
    </Navbar>
  );
};

const CustomNavDropDown = props => {
  const appSettings = useContext(AppContext);
  const { textColor } = appSettings;
  const [activeColor, setActiveColor] = useState(textColor);
  return (
    <Nav
      style={{ alignItems: 'center', color: activeColor, cursor:'default' }}
      onMouseEnter={() => setActiveColor('grey')}
      onMouseLeave={() => setActiveColor(textColor)}
    >
      <Dropdown>
        <Dropdown.Toggle as={'NavLink'}>Navigate</Dropdown.Toggle>
        <Dropdown.Menu>
          {props.children}
        </Dropdown.Menu>
      </Dropdown>
    </Nav>
  );
};

const CustomNavLink = props => {
  const appSettings = useContext(AppContext);
  const { textColor } = appSettings;
  const [activeColor, setActiveColor] = useState(textColor);
  return (
    <Nav.Link
      style={{ color: activeColor }}
      disabled={props.disabled}
      href={props.href}
      onMouseEnter={() => setActiveColor('grey')}
      onMouseLeave={() => setActiveColor(textColor)}
    >
      {props.children}
    </Nav.Link>
  );
};

export default AppBar;
