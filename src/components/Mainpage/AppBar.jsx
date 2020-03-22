import React, { useContext, useState } from 'react';
import { Navbar, Nav, Dropdown, Container } from 'react-bootstrap';
import { Breakpoint, useCurrentBreakpointName } from 'react-socks';
import { AppContext } from '../../AppContext';
import Logo from '../Logo/Logo';

function AppBar() {
  return (
    <>
      <Breakpoint small down>
        <MobileView />
      </Breakpoint>
      <Breakpoint medium up>
        <DesktopView />
      </Breakpoint>
    </>
  );
}

const DesktopView = () => {
  const appSettings = useContext(AppContext);
  const {
    fgColorDetail,
    appbarFontStyle,
    textColor,
    appbarFontSize
  } = appSettings;
  const breakpoint = useCurrentBreakpointName();
  const imageObj = {
    splatWidth: breakpoint === 'xlarge' ? '4vw' : '6vw'
  };
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
      <Container style={{ textAlign: 'center' }}>
        <Nav>
          <CustomNavLink href='/'>Home</CustomNavLink>
          <CustomNavLink disabled={true}> |</CustomNavLink>
          <CustomNavLink href='/software'>Software</CustomNavLink>
        </Nav>
        <Navbar.Brand>
          <Navbar.Text
            style={{
              color: textColor,
              cursor: 'default',
              fontSize: appbarFontSize
            }}
          >
            prather.cc
          </Navbar.Text>
          <Logo imageObj={imageObj} />
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

const MobileView = () => {
  const appSettings = useContext(AppContext);
  const {
    fgColorDetail,
    appbarFontStyle,
    textColor,
    appbarFontSize
  } = appSettings;
  const imageObj = {
    splatWidth: '10vw'
  };
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
      <Container style={{ alignItem: 'center' }}>
        <CustomNavDropDown>
          <Dropdown.Item href='/'>Home</Dropdown.Item>
          <Dropdown.Item href='/software'>Software</Dropdown.Item>
        </CustomNavDropDown>
        <Navbar.Brand>
          <Navbar.Text
            style={{
              color: textColor,
              cursor: 'default',
              fontSize: appbarFontSize
            }}
          >
            prather.cc
          </Navbar.Text>
          <Logo imageObj={imageObj} />
        </Navbar.Brand>
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
        <Dropdown.Toggle as={'NavLink'}>Navigate</Dropdown.Toggle>
        <Dropdown.Menu>{props.children}</Dropdown.Menu>
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
