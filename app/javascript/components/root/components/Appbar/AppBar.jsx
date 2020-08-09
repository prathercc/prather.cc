import React, { useContext, forwardRef } from 'react';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import Navbar from 'react-bootstrap/Navbar';
import { getThemeColor, getIconSizing, StandardTooltip } from '../Utility/Utility';
import { AppContext } from '../../AppContext';
import NavIcon from 'react-bootstrap-icons/dist/icons/list';
import InfoIcon from 'react-bootstrap-icons/dist/icons/question-circle';
import { useCurrentBreakpointName } from 'react-socks';
import SignIn from './SignIn';

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
            <Dropdown.Menu style={{ minWidth: '100%', backgroundColor: bgColor, border: `2px solid ${getThemeColor(0.5)}`, borderTop: 'none', fontSize: standardTitleFontSize, textAlign: 'center' }}>
              <Nav.Link as='div' className='appbarDefault' eventKey='Home' onClick={() => onSelect('Home')}>Home</Nav.Link>
              <Nav.Link as='div' className='appbarDefault' eventKey='Software' onClick={() => onSelect('Software')}>Software</Nav.Link>
              {userData?.group === 'Administrator' && <Nav.Link as='div' className='appbarDefault' eventKey='Maintenance' onClick={() => onSelect('Maintenance')}>Maintenance</Nav.Link>}
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
        <SignIn displayAlert={displayAlert} setUserData={setUserData} userData={userData} />
        <MoreInformation />
      </Navbar>
    </div >
  );
};

const MoreInformation = () => {
  return (
    <>
      <StandardTooltip text='More Information'>
        <Nav.Link style={{ minHeight: '100%', display: 'flex' }} as='span' className='appbarDefault'>
          <span style={{ fontSize: getIconSizing(), margin: 'auto', lineHeight: 0 }}>
            <InfoIcon />
          </span>
        </Nav.Link>
      </StandardTooltip>
    </>
  );
};

export default AppBar;
