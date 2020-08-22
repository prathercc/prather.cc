import React, { useContext, forwardRef, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import Navbar from 'react-bootstrap/Navbar';
import { getThemeColor, getIconSizing, StandardTooltip, StandardModal, StandardImage, StandardSpinner, getThemeBackground } from '../Utility/Utility';
import { AppContext } from '../../AppContext';
import NavIcon from 'react-bootstrap-icons/dist/icons/list';
import AtIcon from 'react-bootstrap-icons/dist/icons/at';
import { useCurrentBreakpointName } from 'react-socks';
import SignIn from './SignIn';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect } from 'react';

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
        {' '}&#x25BE;
      </span>
    </Nav.Link>
  ));

  return (
    <Navbar style={{ fontSize: standardTitleFontSize, fontFamily: fontStyle, padding: 0, ...activePadding, margin: 'auto', background: getThemeBackground() }}>
      <Nav className='mr-auto'>
        <Dropdown>
          <Dropdown.Toggle as={CustomToggle} />
          <Dropdown.Menu style={{ minWidth: '100%', backgroundColor: bgColor, border: `2px solid ${getThemeColor(0.3)}`, borderTop: 'none', fontSize: standardTitleFontSize, textAlign: 'center', padding: 0, margin: 0 }}>
            <Nav.Link as='div' className='appbarDefault' eventKey='Home' onClick={() => onSelect('Home')}>Home</Nav.Link>
            <Nav.Link as='div' className='appbarDefault' eventKey='Software' onClick={() => onSelect('Software')}>Software</Nav.Link>
            {userData?.group === 'Administrator' && <Nav.Link as='div' className='appbarDefault' eventKey='Maintenance' onClick={() => onSelect('Maintenance')}>Maintenance</Nav.Link>}
          </Dropdown.Menu>
        </Dropdown>
      </Nav>
      <SignIn displayAlert={displayAlert} setUserData={setUserData} userData={userData} />
      <RelatedLinks />
    </Navbar>
  );
};

const RelatedLinks = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [loadingObj, setLoadingObj] = useState({ youtube: false, github: false });
  let allContentLoaded = loadingObj.youtube && loadingObj.github;

  useEffect(() => {
    if (!modalOpen) {
      setLoadingObj({ youtube: false, github: false });
    }
  }, [modalOpen]);

  return (
    <>
      <StandardTooltip text='External Links'>
        <Nav.Link onClick={() => setModalOpen(true)} style={{ display: 'flex' }} as='span' className='appbarDefault'>
          <span style={{ fontSize: getIconSizing(), margin: 'auto', lineHeight: 0 }}>
            <AtIcon />
          </span>
        </Nav.Link>
      </StandardTooltip>
      <StandardModal title='External Links' modalOpen={modalOpen} handleModalClose={() => setModalOpen(false)}>
        <Row style={{ display: allContentLoaded ? '' : 'none' }}>
          <Col xs={12} lg={6} style={{ marginTop: '1vh' }}>
            <StandardImage onLoaded={() => setLoadingObj({ ...loadingObj, youtube: true })} onClick={() => window.open('https://www.youtube.com/channel/UC7_J0pO4THZ_QqQWqXwRl3w')} toolTip='Prathercc on YouTube' className='defaultImageNudge' style={{ maxWidth: '55%', padding: '25px' }} src='https://i92.servimg.com/u/f92/11/29/62/29/yt_log11.png' />
          </Col>
          <Col xs={12} lg={6} style={{ marginTop: '1vh' }}>
            <StandardImage onLoaded={() => setLoadingObj({ ...loadingObj, github: true })} onClick={() => window.open('https://github.com/prathercc')} toolTip='Prathercc on GitHub' className='defaultImageNudge' style={{ maxWidth: '55%' }} src='https://i92.servimg.com/u/f92/11/29/62/29/github10.png' />
          </Col>
        </Row>
        <Row style={{ display: !allContentLoaded ? '' : 'none' }}>
          <StandardSpinner />
        </Row>
      </StandardModal>
    </>
  );
};

export default AppBar;
