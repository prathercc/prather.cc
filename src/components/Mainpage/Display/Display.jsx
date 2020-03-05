import React from 'react';
import './Display.css';
import { Image, Container, Row, Col } from 'react-bootstrap';
import prathercctext from '../../../images/prathercctext.png';
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
      <Row>
        <Col>
          <Image
            rounded
            className={imageObj.imageClass}
            style={{
              width: imageObj.textWidth,
              height: 'auto'
            }}
            src={prathercctext}
          ></Image>
        </Col>
      </Row>
    </Container>
  );
};

function Display() {
  const imageObj = {
    splatWidth: '30vw',
    textWidth: '25vw',
    imageClass: 'App-logo-large'
  };
  return (
    <header style={{ marginTop: '15vh' }}>
      <Breakpoint large down>
        <PrathImage
          imageObj={{
            ...imageObj,
            imageClass: 'App-logo-small',
            splatWidth: '60vw',
            textWidth: '50vw'
          }}
        />
      </Breakpoint>
      <Breakpoint xlarge up>
        <PrathImage imageObj={{ ...imageObj }} />
      </Breakpoint>
    </header>
  );
}

export default Display;
