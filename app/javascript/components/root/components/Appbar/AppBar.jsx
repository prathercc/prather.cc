import React, { useContext, forwardRef, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
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

  const CustomToggle = forwardRef(({ onClick }, ref) => (
    <Nav.Link
      as='div'
      className='appbarDefault'
      style={{ minHeight: '100%', display: 'flex', alignItems: 'center' }}
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <div style={{ margin: 'auto', fontSize: getIconSizing() }}>
        <MDBIcon icon="list-alt" />
      </div>
      <span style={{ fontSize: standardTitleFontSize, paddingLeft: '5px' }}>Browse{' '}&#x25BE;</span>
    </Nav.Link>
  ));

  return (
    <Navbar style={{ fontSize: standardTitleFontSize, fontFamily: fontStyle, padding: 0, ...activePadding, margin: 'auto', background: getThemeBackground() }}>
      <Nav className='mr-auto'>
        <Dropdown>
          <Dropdown.Toggle as={CustomToggle} />
          <Dropdown.Menu style={{ minWidth: '100%', backgroundColor: bgColor, border: `1px solid ${getThemeColor(0.3)}`, borderTop: 'none', fontSize: standardTitleFontSize, textAlign: 'center', padding: 0, margin: 0, boxShadow: '3px 3px 10px black' }}>
            <Nav.Link as='div' className='appbarDefault' eventKey='Home' onClick={() => onSelect('Home')}>Home</Nav.Link>
            <Nav.Link as='div' className='appbarDefault' eventKey='Software' onClick={() => onSelect('Software')}>Software</Nav.Link>
            {userData?.group === 'Administrator' && <Nav.Link as='div' className='appbarDefault' eventKey='Maintenance' onClick={() => onSelect('Maintenance')}>Maintenance</Nav.Link>}
          </Dropdown.Menu>
        </Dropdown>
      </Nav>
      <SignIn displayAlert={displayAlert} setUserData={setUserData} userData={userData} />
      <Github />
      <Youtube />
    </Navbar>
  );
};

const Github = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <StandardTooltip text='GitHub'>
        <Nav.Link onClick={() => setModalOpen(true)} style={{ display: 'flex' }} as='span' className='appbarDefault'>
          <div style={{ margin: 'auto', fontSize: getIconSizing() }}>
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

const Youtube = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <StandardTooltip text='YouTube'>
        <Nav.Link onClick={() => setModalOpen(true)} style={{ display: 'flex' }} as='span' className='appbarDefault'>
          <div style={{ margin: 'auto', fontSize: getIconSizing() }}>
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
