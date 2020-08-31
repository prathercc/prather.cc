import React, { useContext, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { getThemeColor, getIconSizing, StandardTooltip, getThemeBackground, StandardLinkModal } from '../Utility/Utility';
import { AppContext } from '../../AppContext';
import { useCurrentBreakpointName } from 'react-socks';
import SignIn from './SignIn';
import { MDBIcon } from "mdbreact";

function AppBar({ userData, setUserData, onSelect, displayAlert }) {
  const { standardTitleFontSize, bgColor, fontStyle } = useContext(AppContext);
  const breakpoint = useCurrentBreakpointName();
  const activePadding = breakpoint === 'xsmall' ? { paddingLeft: 0, paddingRight: 0 } : { paddingLeft: '5%', paddingRight: '5%' };
  const linkPadding = { paddingLeft: '10px', paddingRight: '10px' };

  return (
    <Navbar style={{ fontSize: standardTitleFontSize, fontFamily: fontStyle, padding: 0, ...activePadding, margin: 'auto', background: getThemeBackground() }}>
      <Nav className='mr-auto'>
        {/* <Home style={linkPadding} onSelect={onSelect} /> */}
        <Software style={linkPadding} onSelect={onSelect} />
        {userData?.group === 'Administrator' && <Maintenance style={linkPadding} onSelect={onSelect} />}
      </Nav>
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
        <div style={{ margin: 'auto', fontSize: getIconSizing() }}>
          <MDBIcon fab icon="whmcs" /><span style={{ fontSize: standardTitleFontSize }}></span>
        </div>
      </Nav.Link>
    </StandardTooltip>
  );
};

const Software = ({ onSelect, style }) => {
  const { standardTitleFontSize } = useContext(AppContext);
  return (
    <StandardTooltip text='Software'>
      <Nav.Link onClick={() => onSelect('Software')} style={{ display: 'flex', ...style }} as='span' className='appbarDefault'>
        <div style={{ margin: 'auto', fontSize: getIconSizing() }}>
          <MDBIcon far icon="hdd" /><span style={{ fontSize: standardTitleFontSize }}></span>
        </div>
      </Nav.Link>
    </StandardTooltip>
  );
};

const Home = ({ onSelect, style }) => {
  const { standardTitleFontSize } = useContext(AppContext);
  return (
    <StandardTooltip text='Home'>
      <Nav.Link onClick={() => onSelect('Home')} style={{ display: 'flex', ...style }} as='span' className='appbarDefault'>
        <div style={{ margin: 'auto', fontSize: getIconSizing() }}>
          <MDBIcon icon="home" /><span style={{ fontSize: standardTitleFontSize }}></span>
        </div>
      </Nav.Link>
    </StandardTooltip>
  );
};

const Github = ({ style }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { standardTitleFontSize } = useContext(AppContext);
  return (
    <>
      <StandardTooltip text='GitHub'>
        <Nav.Link onClick={() => setModalOpen(true)} style={{ display: 'flex', ...style }} as='span' className='appbarDefault'>
          <div style={{ margin: 'auto', fontSize: getIconSizing() }}>
            <MDBIcon fab icon="github" /><span style={{ fontSize: standardTitleFontSize }}></span>
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
          <div style={{ margin: 'auto', fontSize: getIconSizing() }}>
            <MDBIcon fab icon="youtube" /><span style={{ fontSize: standardTitleFontSize }}></span>
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
