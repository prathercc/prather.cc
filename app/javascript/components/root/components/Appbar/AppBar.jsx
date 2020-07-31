import React, { useContext, forwardRef } from 'react';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import Navbar from 'react-bootstrap/Navbar';
import { getThemeColor, StandardIconButton } from '../Utility/Utility';
import Admin from './Admin';
import { AppContext } from '../../AppContext';
import NavIcon from 'react-bootstrap-icons/dist/icons/list';
import { useCurrentBreakpointName } from 'react-socks';
import MoreInformation from './MoreInformation';

function AppBar({ userData, setUserData, onSelect }) {
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
      <StandardIconButton isActive={false} icon={<NavIcon />}>
        <span style={{ fontSize: standardTitleFontSize }}>
          Navigate{' '}&#x25BE;
        </span>
      </StandardIconButton>
    </Nav.Link>
  ));

  return (
    <div style={{ backgroundColor: bgColor, position: 'relative' }}>
      <Navbar style={{ fontSize: standardTitleFontSize, height: '6vh', backgroundColor: getThemeColor(0.5), fontFamily: fontStyle, padding: 0, ...activePadding }}>
        <Nav style={{ height: '100%' }} className='mr-auto'>
          <Dropdown>
            <Dropdown.Toggle as={CustomToggle} />
            <Dropdown.Menu style={{ minWidth: '100%', backgroundColor: bgColor, border: `2px solid ${getThemeColor(0.5)}`, borderTop: 'none', fontSize: standardTitleFontSize, textAlign: 'center' }}>
              <Nav.Link className='appbarDefault' eventKey='Home' onClick={() => onSelect('Home')}>Home</Nav.Link>
              <Nav.Link className='appbarDefault' eventKey='Software' onClick={() => onSelect('Software')}>Software</Nav.Link>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
        <Admin setUserData={setUserData} userData={userData} />
        <MoreInformation />
      </Navbar>
    </div >
  );
}

export default AppBar;
