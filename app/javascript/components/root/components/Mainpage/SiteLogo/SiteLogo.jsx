import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { StandardImage } from '../../Utility/Utility';

function SiteLogo() {
  return (
    <Container style={{ opacity: .9, marginTop: '5vh' }}>
      <Row>
        <Col>
          <StandardImage style={{ maxWidth: '95%', filter: 'grayscale(0.4)' }} src='https://i.servimg.com/u/f92/11/29/62/29/filter10.png' />
        </Col>
      </Row>
    </Container>
  );
}
export default SiteLogo;
