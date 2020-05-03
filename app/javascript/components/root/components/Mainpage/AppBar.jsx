import React, { useContext, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import { Breakpoint } from 'react-socks';
import { AppContext } from '../../AppContext';
import { StandardSeparator } from '../Utility/Utility';

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
      <Container style={{ textAlign: 'center' }}>
        <Nav>
          <CustomNavLink href='/'>Home</CustomNavLink>
          <CustomNavLink disabled={true} />
          <CustomNavLink href='/software'>Software</CustomNavLink>
        </Nav>
        <CustomBrand appbarFontSize={appbarFontSize} />
      </Container>
    </Navbar>
  );
};

const MobileView = () => {
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
      <Container style={{ alignItem: 'center' }}>
        <CustomNavDropDown>
          <Dropdown.Item href='/' onClick={() => window.open('/', '_self')}>Home</Dropdown.Item>
          <Dropdown.Item href='/' onClick={() => window.open('/software', '_self')}>Software</Dropdown.Item>
        </CustomNavDropDown>
        <CustomBrand appbarFontSize={appbarFontSize} />
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
      style={{ color: activeColor, padding: '5px', cursor: props.disabled ? '' : 'pointer' }}
      onClick={() => window.open(props.href, '_self')}
      onMouseEnter={() => props.disabled ? '' : setActiveColor('grey')}
      onMouseLeave={() => setActiveColor(textColor)}
    >
      {props.disabled ? <StandardSeparator /> : props.children}
    </div>
  );
};

const CustomBrand = props => {
  const { appbarFontSize } = props;
  return (
    <Navbar.Brand style={{ cursor: 'default', fontSize: appbarFontSize }} onClick={() => window.open('/login', '_self')}>
      {'<'}
      <div style={{ color: '#4fc9c9', display: 'inline' }}>Prather.cc</div>
      {' />'}
    </Navbar.Brand>
  )
}

export default AppBar;
