import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { StandardImage } from '../../Utility/Utility';

function SiteLogo() {
  return (
    <Container style={{ marginTop: '3vh', filter:'grayscale(0.6)' }}>
      <Row>
        <Col style={{ padding: 0 }}>
          <StandardImage className='logoAnim' src='https://i92.servimg.com/u/f92/11/29/62/29/filter13.png' />
        </Col>
      </Row>
    </Container>
  );
}
export default SiteLogo;
