import React, { useContext } from 'react';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { getThemeColor, getIconSizing } from '../Utility/Utility';
import Admin from './Admin';
import { AppContext } from '../../AppContext';
import NavIcon from 'react-bootstrap-icons/dist/icons/list-nested';

function AppBar({ userData, setUserData }) {
  const { appbarFontSize, bgColor, standardCardTitleFontSize, fontStyle } = useContext(AppContext);
  return (
    <div style={{ backgroundColor: bgColor, position: 'relative' }}>
      <Nav style={{ minWidth: '100%', fontSize: appbarFontSize, backgroundColor: getThemeColor(0.5), fontFamily: fontStyle }}>
        <Row style={{ minWidth: '100%', margin: 'auto' }}>
          <Col style={{ maxWidth: 'max-content', margin: 'auto' }}>
            <Dropdown>
              <Dropdown.Toggle className='appbarDefault' as={Nav.Link}><NavIcon style={{ fontSize: getIconSizing('small') }} /> Navigate</Dropdown.Toggle>
              <Dropdown.Menu style={{ minWidth: '100%', backgroundColor: bgColor, border: `1px solid ${getThemeColor(0.5)}`, borderTop: 'none', fontSize: standardCardTitleFontSize }}>
                <Nav.Link className='appbarDefault' eventKey='Home'>Home</Nav.Link>
                <Nav.Link className='appbarDefault' eventKey='Software'>Software</Nav.Link>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col style={{ maxWidth: 'max-content', margin: 'auto' }}>
            <Admin setUserData={setUserData} userData={userData} />
          </Col>
        </Row>
      </Nav>
    </div>
  );
}

export default AppBar;
