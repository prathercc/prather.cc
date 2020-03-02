import React, { useContext } from 'react';
import { Navbar, Nav, Image, NavDropdown} from 'react-bootstrap';
import { Breakpoint } from 'react-socks';
import pratherccsplat from '../../../images/pratherccsplat.png';
import { AppContext } from '../../../AppContext';

function DefaultAppBar() {
  const appSettings = useContext(AppContext);
  const { fgColor } = appSettings;
  return (
    <Navbar
      style={{ fontSize: 'calc(10px + 2vmin)', backgroundColor: fgColor }}
      variant='dark'
    >
      <Nav>
        <NavDropdown title='Navigate'>
          <NavDropdown.Item href='/'>Home</NavDropdown.Item>
          <NavDropdown.Item href='/software'>Software</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar>
  );
}

export default DefaultAppBar;
