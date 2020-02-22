import React from "react";
import "./DefaultLogo.css";
import { Image, Container, Row, Col } from "react-bootstrap";
import prathdevtext from "./prathdevtext.png";
import prathdevsplat from "./prathdevsplat.png";
import { Breakpoint } from "react-socks";

const PrathImage = props => {
  const { imageObj } = props;
  return (
    <Container>
      <Row>
        <Col>
          <Image
            src={prathdevsplat}
            style={{
              width: imageObj.splatWidth,
              height: "auto"
            }}
            rounded
          ></Image>
        </Col>
      </Row>
      <Row>
        <Col>
          <Image
            rounded
            className={imageObj.imageClass}
            style={{
              width: imageObj.textWidth,
              height: "auto"
            }}
            src={prathdevtext}
          ></Image>
        </Col>
      </Row>
    </Container>
  );
};

function DefaultLogo() {
  const imageObj = {
    splatWidth: "30vw",
    textWidth: "15vw",
    imageClass: "App-logo-large"
  };
  return (
    <>
      <Breakpoint large down>
        <PrathImage
          imageObj={{
            ...imageObj,
            imageClass: "App-logo-small",
            splatWidth: "60vw",
            textWidth: "30vw"
          }}
        />
      </Breakpoint>
      <Breakpoint xlarge up>
        <PrathImage imageObj={{ ...imageObj }} />
      </Breakpoint>
    </>
  );
}

export default DefaultLogo;
