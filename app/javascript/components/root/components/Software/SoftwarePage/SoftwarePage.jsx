import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { AppContext } from '../../../AppContext';
import { useCurrentBreakpointName } from 'react-socks';

function SoftwarePage(props) {
  const appSettings = useContext(AppContext);
  const { fgColor, fontStyle, softwareFontSize } = appSettings;
  const breakpoint = useCurrentBreakpointName();
  return (
    <Container style={{ width: breakpoint === 'xlarge' ? '50vw' : '' }}>
      <Jumbotron
        bg='dark'
        style={{
          backgroundColor: fgColor,
          fontFamily: fontStyle,
          marginTop: '5vh',
          opacity: '0.9',
          fontSize: softwareFontSize
        }}
      >
        {props.children}
      </Jumbotron>
    </Container>
  );
}
export default SoftwarePage;
