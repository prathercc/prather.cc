import React, {useContext} from 'react';
import { Navbar, Nav, Image } from 'react-bootstrap';
import { Breakpoint } from 'react-socks';
import pratherccsplat from '../../../images/pratherccsplat.png';
import { AppContext } from '../../../AppContext';

const BannerImage = props => {
  const appSettings = useContext(AppContext);
  const { bgColor } = appSettings;
  const { width } = props;
  return (
    <Image
      roundedCircle
      style={{ height: 'auto', width, backgroundColor: bgColor }}
      src={pratherccsplat}
    ></Image>
  );
};

function DefaultAppBar() {
  const appSettings = useContext(AppContext);
  const { fgColor } = appSettings;
  return (
    <Navbar style={{ fontSize: 'calc(10px + 2vmin)', backgroundColor:fgColor }}  variant='dark'>
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
