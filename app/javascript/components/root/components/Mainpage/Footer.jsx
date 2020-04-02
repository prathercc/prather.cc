import React, { useContext } from 'react';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
import { Breakpoint } from 'react-socks';
import { AppContext } from '../../AppContext';

function Footer(props) {
  return (
    <>
      <Breakpoint xlarge down>
        <DesktopView titleObject={props.titleObject} />
      </Breakpoint>
    </>
  );
}

const DesktopView = props => {
  const appSettings = useContext(AppContext);
  const {
    fgColorDetail,
    textColor,
    appbarFontSize,
    appbarFontStyle
  } = appSettings;
  return (
    <Navbar
      style={{
        backgroundColor: fgColorDetail,
        height: '15vh',
        color: textColor,
        fontFamily: appbarFontStyle,
        fontSize: appbarFontSize
      }}

    >
      <Nav>
      </Nav>
      <Container style={{textAlign:'center'}}>
          <Row>
            <Col>
            <a style={{color:'white'}}href="https://github.com/prathercc" target="_blank" rel="noopener noreferrer">GitHub</a>
            </Col>
            <Col></Col>
            <Col>
            <a style={{color:'white'}}href="https://youtube.com/prathercc" target="_blank" rel="noopener noreferrer">Youtube</a>
            </Col>
          </Row>
          <Row>
            <Col>© 2020 prather.cc</Col>
          </Row>
        </Container>
    </Navbar>
  );
};

export default Footer;
