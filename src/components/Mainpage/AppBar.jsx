import React, { useContext } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
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

const NavFiller = () => {
  return <Nav.Link disabled> /</Nav.Link>;
};

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
        <Nav.Link href='/'>Home</Nav.Link>
        <NavFiller />
        <Nav.Link href='/software'>Software</Nav.Link>
      </Nav>
      <Navbar.Brand style={{ right: '1vw', position: 'fixed' }}>
      <Logo imageObj={{ ...imageObj, alwaysFast: true }} />
        <Navbar.Text style={{ color: 'white', cursor: 'default' }}>
          prather.cc
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
      <Nav style={{ alignItems: 'center' }}>
        <NavDropdown title='Navigate'>
          <NavDropdown.Item href='/'>Home</NavDropdown.Item>
          <NavDropdown.Item href='/software'>Software</NavDropdown.Item>
        </NavDropdown>
      </Nav>
      <Navbar.Brand style={{ right: '1vw', position: 'fixed' }}>
        <Logo imageObj={{ ...imageObj, alwaysFast: true }} />
        <Navbar.Text style={{ color: 'white', cursor: 'default' }}>
          prather.cc
        </Navbar.Text>
      </Navbar.Brand>
    </Navbar>
  );
};

export default AppBar;
