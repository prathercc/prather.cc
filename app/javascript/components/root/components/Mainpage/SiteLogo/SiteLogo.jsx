import React from 'react';
import Row from 'react-bootstrap/Row';
import { StandardImage } from '../../Utility/Utility';

function SiteLogo() {
  return (
    <Row style={{ filter: 'grayscale(0.2)', opacity: 1, padding: 0, maxWidth: 'max-content', margin: 'auto', marginTop: '5vh' }}>
      <StandardImage
        style={{ maxWidth: '45%', borderRadius: '15px', pointerEvents: 'none' }}
        className='siteLogo'
        src='https://i92.servimg.com/u/f92/11/29/62/29/filter20.png'
      />
    </Row>
  );
};

export default SiteLogo;
