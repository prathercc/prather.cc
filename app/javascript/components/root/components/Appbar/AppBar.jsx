import React, { useContext, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { getThemeColor, StandardTooltip, getThemeBackground, StandardLinkModal } from '../Utility/Utility';
import { AppContext } from '../../AppContext';
import { useCurrentBreakpointName } from 'react-socks';
import SignIn from './SignIn';
import { MDBIcon } from "mdbreact";

function AppBar({ userData, setUserData, onSelect, displayAlert }) {
  const { standardTitleFontSize, fontStyle } = useContext(AppContext);
  const breakpoint = useCurrentBreakpointName();
  const activePadding = breakpoint === 'xsmall' ? { paddingLeft: 0, paddingRight: 0 } : { paddingLeft: '5%', paddingRight: '5%' };
  const linkPadding = { paddingLeft: '10px', paddingRight: '10px' };

  return (
    <Navbar style={{ fontSize: standardTitleFontSize, fontFamily: fontStyle, padding: 0, ...activePadding, margin: 'auto', background: getThemeBackground() }}>
      <Nav className='mr-auto'>
        <Home style={linkPadding} onSelect={onSelect} />
        <Software style={linkPadding} onSelect={onSelect} />
      </Nav>
      {userData?.group === 'Administrator' && <Maintenance style={linkPadding} onSelect={onSelect} />}
      <SignIn style={linkPadding} displayAlert={displayAlert} setUserData={setUserData} userData={userData} />
      <Github style={linkPadding} />
      <Youtube style={linkPadding} />
    </Navbar>
  );
};

const Maintenance = ({ onSelect, style }) => {
  const { standardTitleFontSize } = useContext(AppContext);
  return (
    <StandardTooltip text='Maintenance'>
      <Nav.Link onClick={() => onSelect('Maintenance')} style={{ display: 'flex', ...style }} as='span' className='appbarDefault'>
        <div style={{ margin: 'auto', fontSize: standardTitleFontSize }}>
          <MDBIcon fab icon="whmcs" />
        </div>
      </Nav.Link>
    </StandardTooltip>
  );
};

const Software = ({ onSelect, style }) => {
  const { standardTitleFontSize } = useContext(AppContext);
  return (
    <Nav.Link onClick={() => onSelect('Software')} style={{ display: 'flex', ...style }} as='span' className='appbarDefault'>
      <div style={{ margin: 'auto', fontSize: standardTitleFontSize }}>
        Software
        </div>
    </Nav.Link>
  );
};

const Home = ({ onSelect, style }) => {
  const { standardTitleFontSize } = useContext(AppContext);
  return (
    <Nav.Link onClick={() => onSelect('Home')} style={{ display: 'flex', ...style }} as='span' className='appbarDefault'>
      <div style={{ margin: 'auto', fontSize: standardTitleFontSize }}>
        Home
        </div>
    </Nav.Link>
  );
};

const Github = ({ style }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { standardTitleFontSize } = useContext(AppContext);
  return (
    <>
      <StandardTooltip text='GitHub'>
        <Nav.Link onClick={() => setModalOpen(true)} style={{ display: 'flex', ...style }} as='span' className='appbarDefault'>
          <div style={{ margin: 'auto', fontSize: standardTitleFontSize }}>
            <MDBIcon fab icon="github" />
          </div>
        </Nav.Link>
      </StandardTooltip>
      <StandardLinkModal modalOpen={modalOpen} handleModalClose={() => setModalOpen(false)} link='https://github.com/prathercc'>
        Open the official <span style={{ color: getThemeColor(1) }}>Prather.cc</span> GitHub page?
      </StandardLinkModal>
    </>
  );
};

const Youtube = ({ style }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { standardTitleFontSize } = useContext(AppContext);
  return (
    <>
      <StandardTooltip text='YouTube'>
        <Nav.Link onClick={() => setModalOpen(true)} style={{ display: 'flex', ...style }} as='span' className='appbarDefault'>
          <div style={{ margin: 'auto', fontSize: standardTitleFontSize }}>
            <MDBIcon fab icon="youtube" />
          </div>
        </Nav.Link>
      </StandardTooltip>
      <StandardLinkModal modalOpen={modalOpen} handleModalClose={() => setModalOpen(false)} link='https://www.youtube.com/channel/UC7_J0pO4THZ_QqQWqXwRl3w'>
        Open the official <span style={{ color: getThemeColor(1) }}>Prather.cc</span> YouTube page?
      </StandardLinkModal>
    </>
  );
};

export default AppBar;
