import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { StandardImage } from '../../Utility/Utility';

function SiteLogo({ setActiveApplication }) {
  const [toolTip, setToolTip] = useState('Prather.cc');
  return (
    <Container style={{ filter: 'grayscale(0.2)', opacity: 1, marginTop: '3vh' }}>
      <Row>
        <Col style={{ padding: 0, maxWidth: 'max-content', margin: 'auto' }}>
          <StandardImage
            onClick={() => { setToolTip(null); setActiveApplication('Prather.cc'); }}
            style={{ maxWidth: '45%' }}
            className='defaultImageNudge'
            src='https://i92.servimg.com/u/f92/11/29/62/29/filter20.png'
            toolTip={toolTip}
          />
        </Col>
      </Row>
    </Container>
  );
}
export default SiteLogo;
