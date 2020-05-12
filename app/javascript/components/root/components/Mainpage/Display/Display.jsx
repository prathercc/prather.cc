import React from 'react';
import './Display.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Breakpoint } from 'react-socks';
import Logo from '../../Logo/Logo';
import { StandardCard } from '../../Utility/Utility';

function Display() {
  return (
    <>
      <Breakpoint small down>
        <PrathImage splatWidth='75vw' />
      </Breakpoint>
      <Breakpoint medium only>
        <PrathImage splatWidth='55vw' />
      </Breakpoint>
      <Breakpoint large only>
        <PrathImage splatWidth='45vw' />
      </Breakpoint>
      <Breakpoint xlarge up>
        <PrathImage splatWidth='25vw' />
      </Breakpoint>
      <FloatText />
    </>
  );
}

const FloatText = () => {
  return (
    <StandardCard style={{ opacity: 0.8, width: '100%', margin: 'auto' }}>
      <div style={{ fontSize: 'calc(6.5px + 2vmin)', color: 'white' }}>
        Welcome to
        {' <'}
        <div style={{ color: '#4fc9c9', display: 'inline' }}>Prather.cc</div>
        {' />'}
      </div>
    </StandardCard>
  )
}

const PrathImage = props => {
  const { splatWidth } = props;

  return (
    <Container className='App-splat-to-mobile' style={{ opacity: .85 }}>
      <Row>
        <Col>
          <Logo splatWidth={splatWidth} />
        </Col>
      </Row>
    </Container>
  );
};

export default Display;
