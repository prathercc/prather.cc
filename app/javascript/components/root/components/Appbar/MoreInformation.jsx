import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { StandardTooltip, getIconSizing } from '../Utility/Utility';
import InfoIcon from 'react-bootstrap-icons/dist/icons/question-circle';

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


export default MoreInformation;
