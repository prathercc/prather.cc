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
    >
      <Container style={{ textAlign: 'center' }}>
        <Nav>
          <CustomNavLink href='/'>Home</CustomNavLink>
          <CustomNavLink disabled={true}> |</CustomNavLink>
          <CustomNavLink href='/software'>Software</CustomNavLink>
        </Nav>
        <Navbar.Brand style={{ cursor: 'default' }} onClick={() => window.open('/login', '_self')}>
          <Navbar.Text
            style={{
              color: textColor,
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
    >
      <Container style={{ alignItem: 'center' }}>
        <CustomNavDropDown>
          <Dropdown.Item href='/' onClick={() => window.open('/', '_self')}>Home</Dropdown.Item>
          <Dropdown.Item href='/' onClick={() => window.open('/software', '_self')}>Software</Dropdown.Item>
        </CustomNavDropDown>
        <Navbar.Brand onClick={() => window.open('/login', '_self')}>
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
        <Dropdown.Toggle style={{ color: activeColor }} as={Nav.Link}>Navigate</Dropdown.Toggle>
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
    <div
      style={{ color: activeColor, padding: '5px' }}
      onClick={() => window.open(props.href, '_self')}
      onMouseEnter={() => props.disabled ? '' : setActiveColor('grey')}
      onMouseLeave={() => setActiveColor(textColor)}
    >
      {props.children}
    </div>
  );
};

export default AppBar;
