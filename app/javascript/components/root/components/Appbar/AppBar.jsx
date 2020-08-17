import React, { useContext, forwardRef, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import Navbar from 'react-bootstrap/Navbar';
import { getThemeColor, getIconSizing, StandardTooltip, StandardModal, StandardImage, StandardButton } from '../Utility/Utility';
import { AppContext } from '../../AppContext';
import NavIcon from 'react-bootstrap-icons/dist/icons/list';
import AtIcon from 'react-bootstrap-icons/dist/icons/at';
import { useCurrentBreakpointName } from 'react-socks';
import SignIn from './SignIn';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function AppBar({ userData, setUserData, onSelect, displayAlert }) {
  const { standardTitleFontSize, bgColor, fontStyle } = useContext(AppContext);
  const breakpoint = useCurrentBreakpointName();
  const activePadding = breakpoint === 'xsmall' ? { paddingLeft: 0, paddingRight: 0 } : { paddingLeft: '15%', paddingRight: '15%' };

  const CustomToggle = forwardRef(({ onClick }, ref) => (
    <Nav.Link
      as='div'
      className='appbarDefault'
      style={{ minHeight: '100%', display: 'flex' }}
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <span style={{ margin: 'auto', fontSize: standardTitleFontSize, lineHeight: 0 }}>
        <NavIcon style={{ fontSize: getIconSizing() }} />
        Navigate{' '}&#x25BE;
      </span>
    </Nav.Link>
  ));

  return (
    <div style={{ backgroundColor: bgColor, position: 'relative' }}>
      <Navbar style={{ fontSize: standardTitleFontSize, height: '6vh', backgroundColor: getThemeColor(0.5), fontFamily: fontStyle, padding: 0, ...activePadding }}>
        <Nav style={{ height: '100%' }} className='mr-auto'>
          <Dropdown>
            <Dropdown.Toggle as={CustomToggle} />
            <Dropdown.Menu style={{ minWidth: '100%', backgroundColor: bgColor, border: `2px solid ${getThemeColor(0.5)}`, borderTop: 'none', fontSize: standardTitleFontSize, textAlign: 'center', padding: 0, margin: 0 }}>
              <Nav.Link as='div' className='appbarDefault' eventKey='Home' onClick={() => onSelect('Home')}>Home</Nav.Link>
              <Nav.Link as='div' className='appbarDefault' eventKey='Software' onClick={() => onSelect('Software')}>Software</Nav.Link>
              {userData?.group === 'Administrator' && <Nav.Link as='div' className='appbarDefault' eventKey='Maintenance' onClick={() => onSelect('Maintenance')}>Maintenance</Nav.Link>}
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
        <SignIn displayAlert={displayAlert} setUserData={setUserData} userData={userData} />
        <RelatedLinks />
      </Navbar>
    </div >
  );
};

const RelatedLinks = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <StandardTooltip text='Related Links'>
        <Nav.Link onClick={() => setModalOpen(true)} style={{ minHeight: '100%', display: 'flex' }} as='span' className='appbarDefault'>
          <span style={{ fontSize: getIconSizing(), margin: 'auto', lineHeight: 0 }}>
            <AtIcon />
          </span>
        </Nav.Link>
      </StandardTooltip>
      <StandardModal title='Related Links' modalOpen={modalOpen} handleModalClose={() => setModalOpen(false)}>
        <Row>
          <Col xs={12} lg={6} style={{ marginTop: '1vh' }}>
            <StandardImage onClick={() => window.open('https://www.youtube.com/channel/UC7_J0pO4THZ_QqQWqXwRl3w')} toolTip='Prathercc on YouTube' className='defaultImageNudge' style={{ maxWidth: '55%', padding: '25px' }} src='https://i92.servimg.com/u/f92/11/29/62/29/yt_log11.png' />
          </Col>
          <Col xs={12} lg={6} style={{ marginTop: '1vh' }}>
            <StandardImage onClick={() => window.open('https://github.com/prathercc')} toolTip='Prathercc on GitHub' className='defaultImageNudge' style={{ maxWidth: '55%' }} src='https://i92.servimg.com/u/f92/11/29/62/29/github10.png' />
          </Col>
        </Row>
      </StandardModal>
    </>
  );
};

export default AppBar;
