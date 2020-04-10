import React, { useContext, useState, useEffect } from 'react';
import { Container, Jumbotron, Form, Button } from 'react-bootstrap';
import { AppContext } from '../../AppContext';
import { useCurrentBreakpointName } from 'react-socks';
import { authenticate, clearSession, getSession } from '../../authService';

function Login(props) {
  const appSettings = useContext(AppContext);
  const { fgColor, fontStyle, softwareFontSize } = appSettings;
  const breakpoint = useCurrentBreakpointName();
  const [userData, setUserData] = useState(null);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const authenticateUser = async () => {
    await authenticate(credentials, setUserData);
  };

  const signOut = async () => {
    await clearSession(setUserData);
  };

  useEffect(() => {
    const fetchSession = async () => {
      await getSession(setUserData);
    };
    fetchSession();
  }, []);

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
        {userData ? (
          <Button onClick={() => signOut()} variant='warning'>
            Sign Out
          </Button>
        ) : (
          <>
            <Form.Control
              type='text'
              placeholder='Email'
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
            />
            <Form.Control
              style={{ marginTop: '1vh' }}
              type='password'
              placeholder='Password'
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
            />

            <Button
              onClick={() => authenticateUser()}
              style={{ marginTop: '1vh' }}
              variant='warning'
            >
              Sign In
            </Button>
          </>
        )}
      </Jumbotron>
    </Container>
  );
}
export default Login;
