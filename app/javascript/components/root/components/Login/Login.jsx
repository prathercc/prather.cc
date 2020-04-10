import React, { useContext, useState } from 'react';
import { Container, Jumbotron, Form, Button } from 'react-bootstrap';
import { AppContext } from '../../AppContext';
import { useCurrentBreakpointName } from 'react-socks';
import {authenticate, getSession} from '../../authService';

function Login(props) {
  const appSettings = useContext(AppContext);
  const { fgColor, fontStyle, softwareFontSize } = appSettings;
  const breakpoint = useCurrentBreakpointName();
  const [credentials, setCredentials] = useState({email: 'test2@gmail.com', password: 'test1'})

  const authenticateUser = async () => {
    console.log('Authenticating...');
    console.log(credentials);
    await authenticate(credentials);
  }

  const session = async () => {
      console.log('current session...');
      await getSession();
  }

  return (
    <Container style={{ width: breakpoint === 'xlarge' ? '50vw' : '' }}>
      <Jumbotron
        bg='dark'
        style={{
          backgroundColor: fgColor,
          fontFamily: fontStyle,
          marginTop: '15vh',
          opacity: '100',
          fontSize: softwareFontSize,
        }}
      >
        <Form.Control
          type='text'
          placeholder='Email'
          onChange={(e) => setCredentials({...credentials, email: e.target.value})}
        />
        <Form.Control
          style={{ marginTop: '1vh' }}
          type='password'
          placeholder='Password'
          onChange={(e) => setCredentials({...credentials, password: e.target.value})}
        />

        <Button
          onClick={() => authenticateUser()}
          style={{ marginTop: '1vh' }}
          variant='warning'
        >
          Sign In
        </Button>
        <p />
        <Button
          onClick={() => session()}
          style={{ marginTop: '1vh' }}
          variant='warning'
        >
          Current Session
        </Button>
      </Jumbotron>
    </Container>
  );
}
export default Login;
