import React, { useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { AppContext } from '../../AppContext';

function Footer() {
  const appSettings = useContext(AppContext);
  const { fgColorDetail } = appSettings;
  return (
    <Navbar
      style={{
        backgroundColor: fgColorDetail,
        height: '5vh',
      }}
    >
    </Navbar>
  );
}

export default Footer;
