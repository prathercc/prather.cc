import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { StandardImage } from '../../Utility/Utility';

function SiteLogo() {
  return (
    <Container style={{ filter: 'grayscale(0.6)', opacity: 1 }}>
      <Row>
        <Col style={{ padding: 0 }}>
          <StandardImage src='https://i92.servimg.com/u/f92/11/29/62/29/filter18.png' />
        </Col>
      </Row>
    </Container>
  );
}
export default SiteLogo;
