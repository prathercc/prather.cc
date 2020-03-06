import React, { useContext } from 'react';
import { Container, Jumbotron } from 'react-bootstrap';
import { AppContext } from '../../AppContext';
import { useCurrentBreakpointName } from 'react-socks';

function SoftwarePage(props) {
    const appSettings = useContext(AppContext);
    const { fgColor } = appSettings;
    const breakpoint = useCurrentBreakpointName();
  return (
<Container style={{ width: breakpoint === 'xlarge' ? '50vw' : '' }}>
      <Jumbotron
        bg='dark'
        style={{
          backgroundColor: fgColor,
          marginTop: '15vh'
        }}
      >
        {props.children}
      </Jumbotron>
    </Container>
  );
}
export default SoftwarePage;
