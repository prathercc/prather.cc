import React from 'react';
import './SiteLogo.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useCurrentBreakpointName } from 'react-socks';
import pratherccsplatBright from '../../../images/pratherccsplatABS1.png';

function SiteLogo() {
  const breakpoint = useCurrentBreakpointName();
  const widthLogic = breakpoint === 'xlarge' ? '25vw' : breakpoint === 'large' ? '45vw' : breakpoint === 'medium' ? '55vw' : '75vw';

  return (
    <Container className='App-splat-to-mobile' style={{ opacity: .85, marginTop: '5vh' }}>
      <Row>
        <Col>
          <img src={pratherccsplatBright} style={{ width: widthLogic, maxWidth: '375px' }} />
        </Col>
      </Row>
    </Container>
  );
}
export default SiteLogo;
