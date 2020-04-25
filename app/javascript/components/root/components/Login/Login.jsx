import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { authenticate, clearSession, getSession } from '../../authService';
import SoftwarePage from '../Software/SoftwarePage/SoftwarePage';

function Login() {
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
    <SoftwarePage>
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
    </SoftwarePage>
  );
}
export default Login;
