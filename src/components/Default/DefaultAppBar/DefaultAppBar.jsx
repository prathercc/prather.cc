import React from 'react';
import { Navbar, Nav, Image } from 'react-bootstrap';
import { Breakpoint } from 'react-socks';
import prathdevsplat from '../../../images/prathdevsplat.png';

const BannerImage = props => {
  const { width } = props;
  return (
    <Image
      roundedCircle
      style={{ height: 'auto', width, backgroundColor: '#666666' }}
      src={prathdevsplat}
    ></Image>
  );
};

function DefaultAppBar() {
  return (
    <Navbar style={{ fontSize: 'calc(10px + 2vmin)' }} bg='dark' variant='dark'>
      <Navbar.Brand>
        <Breakpoint xlarge up>
          <BannerImage width='4vw' />
        </Breakpoint>
        <Breakpoint large down>
          <BannerImage width='20vw' />
        </Breakpoint>
      </Navbar.Brand>
      <Nav>
        <Nav.Link href='/'>Home</Nav.Link>
        <Nav.Link disabled>/</Nav.Link>
        <Nav.Link href='/software'>Software</Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default DefaultAppBar;
