import React from 'react';
import './Display.css';
import { Container, Row, Col } from 'react-bootstrap';
import { Breakpoint } from 'react-socks';
import Logo from '../../Logo/Logo';

const PrathImage = props => {
  const { imageObj } = props;

  return (
    <Container>
      <Row>
        <Col>
          <Logo imageObj={imageObj} />
        </Col>
      </Row>
    </Container>
  );
};

function Display() {
  const imageObj = {
    splatWidth: '35vw',
    imageClass: 'App-logo-large'
  };
  return (
    <header style={{ marginTop: '5vh' }}>
      <Breakpoint medium down>
        <PrathImage
          imageObj={{
            ...imageObj,
            imageClass: 'App-logo-small',
            splatWidth: '75vw'
          }}
        />
      </Breakpoint>
      <Breakpoint large only>
        <PrathImage imageObj={{ 
          ...imageObj,
          splatWidth: '50vw'
        }} />
      </Breakpoint>
      <Breakpoint xlarge up>
        <PrathImage imageObj={{ ...imageObj }} />
      </Breakpoint>
    </header>
  );
}

export default Display;
