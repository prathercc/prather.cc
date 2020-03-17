import React, { useContext } from 'react';
import { Container, Jumbotron } from 'react-bootstrap';
import { AppContext } from '../../../AppContext';
import { useCurrentBreakpointName } from 'react-socks';
import './SoftwarePage.css';
function SoftwarePage(props) {
    const appSettings = useContext(AppContext);
    const { fgColor, fontStyle } = appSettings;
    const breakpoint = useCurrentBreakpointName();
  return (
<Container style={{ width: breakpoint === 'xlarge' ? '50vw' : '' }}>
      <Jumbotron
        bg='dark'
        style={{
          backgroundColor: fgColor,
          fontFamily:fontStyle,
          marginTop: '15vh',
          opacity:'0'
        }}
        className='Page-fade-in'
      >
        {props.children}
      </Jumbotron>
    </Container>
  );
}
export default SoftwarePage;
