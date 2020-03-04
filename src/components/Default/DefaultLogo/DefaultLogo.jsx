import React, { useState } from 'react';
import './DefaultLogo.css';
import { Image, Container, Row, Col } from 'react-bootstrap';
import prathercctext from '../../../images/prathercctext.png';
import { Breakpoint } from 'react-socks';
import pratherccsplatBright from '../../../images/pratherccsplatABS1.png';

const PrathImage = props => {
  const { imageObj } = props;
  const [splatClass, setSplatClass] = useState('');

  return (
    <Container>
      <Row>
        <Col>
          <Image
            roundedCircle
            className={splatClass}
            src={pratherccsplatBright}
            style={{ width: imageObj.splatWidth, filter: 'grayscale(100%)' }}
            onMouseEnter={() => setSplatClass('App-splat-to-color')}
            onMouseLeave={() => setSplatClass('App-splat-to-dark')}
          />
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

function DefaultLogo() {
  const imageObj = {
    splatWidth: '30vw',
    textWidth: '20vw',
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

export default DefaultLogo;
