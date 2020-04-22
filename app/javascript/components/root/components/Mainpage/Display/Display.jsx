import React from 'react';
import './Display.css';
import { Container, Row, Col } from 'react-bootstrap';
import { Breakpoint } from 'react-socks';
import Logo from '../../Logo/Logo';

function Display() {
  return (
    <header style={{ marginTop: '5vh' }}>
      <Breakpoint medium down>
        <PrathImage splatWidth='75vw' />
      </Breakpoint>
      <Breakpoint large only>
        <PrathImage splatWidth='50vw' />
      </Breakpoint>
      <Breakpoint xlarge up>
        <PrathImage splatWidth='35vw' />
      </Breakpoint>
    </header>
  );
}

const PrathImage = props => {
  const { splatWidth } = props;

  return (
    <Container className='App-splat-to-mobile' style={{opacity:0.85}}>
      <Row>
        <Col>
          <Logo splatWidth={splatWidth}/>
        </Col>
      </Row>
    </Container>
  );
};

export default Display;
