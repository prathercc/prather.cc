import React, { useContext } from 'react';
import { Image, Card, Container, Navbar, Nav } from 'react-bootstrap';
import { Breakpoint } from 'react-socks';
import { AppContext } from '../../../AppContext';

function DefaultFooter(props) {
  return (
    <>
      <Breakpoint xlarge down>
        <DesktopView titleObject={props.titleObject} />
      </Breakpoint>
    </>
  );
}

const DesktopView = props => {
  const appSettings = useContext(AppContext);
  const { fgColorDetail } = appSettings;
  return (
    <Navbar style={{ backgroundColor: fgColorDetail, height: '15vh' }}>
      <Nav></Nav>
    </Navbar>
  );
};

export default DefaultFooter;
