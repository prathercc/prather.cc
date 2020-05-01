import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { authenticate, clearSession, getSession } from '../../authService';
import { StandardPage, StandardCard } from '../Utility/Utility';
import { getUsers, createUser, deleteUser } from '../../userService';

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
    await clearSession(setUserData, userData.id);
  };

  useEffect(() => {
    const fetchSession = async () => {
      await getSession(setUserData);
    };
    fetchSession();
  }, []);

  return (
    <StandardPage>
      {userData ? (
        <>
          <Button onClick={() => signOut()} variant='warning'>
            Sign Out
          </Button>
          <AddUser userData={userData} />
          <DeleteUser userData={userData} />
        </>

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
    </StandardPage>
  );
}

const AddUser = ({ userData }) => {

  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
    password2: ''
  })

  const buttonEnabled = newUser.email.length > 0 && newUser.password.length > 0 && newUser.password === newUser.password2 && newUser.email !== userData.email;

  const handleCreateNewUser = async () => {
    await createUser(newUser);
    window.open('/login', '_self');
  }

  return (
    <>
      <StandardCard style={{ marginTop: '2vh' }}>
        <Form.Group style={{ width: '40%' }}>
          <Form.Label>Create New User:</Form.Label>
          <Form.Control
            value={newUser.email}
            type='text'
            placeholder='Email'
            onChange={(e) =>
              setNewUser({ ...newUser, email: e.target.value })
            }
          />
          <Form.Control
            value={newUser.password}
            style={{ marginTop: '1vh' }}
            type='password'
            placeholder='Password'
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
          />
          <Form.Control
            value={newUser.password2}
            style={{ marginTop: '1vh' }}
            type='password'
            placeholder='Password Again'
            onChange={(e) =>
              setNewUser({ ...newUser, password2: e.target.value })
            }
          />
          <Button
            onClick={() => handleCreateNewUser()}
            style={{ marginTop: '1vh', marginBottom: '1vh' }}
            variant='warning'
            disabled={!buttonEnabled}
          >
            Create New User
        </Button>
        </Form.Group>
      </StandardCard>
    </>
  )
}

const DeleteUser = ({ userData }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      await getUsers(setUsers);
    };
    fetchUsers();
  }, []);

  const handleDeleteUser = async () => {
    await deleteUser(selectedUser);
    window.open('/login', '_self');
  };

  const buttonDisabled = (selectedUser.length === 0) || (userData.id.toString() === selectedUser);

  return (
    <>
      <StandardCard style={{ marginTop: '2vh' }}>
        <Form.Group style={{ width: '40%' }}>
          <Form.Label>Delete User:</Form.Label>
          <Form.Control as="select" value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
            <option></option>
            {
              users.map(user => {
                return (
                  <option key={user.id} value={user.id}>{user.email}</option>
                )
              })
            }
          </Form.Control>
        </Form.Group>

        <Button
          onClick={() => handleDeleteUser()}
          style={{ marginTop: '1vh', marginBottom: '1vh' }}
          variant='danger'
          disabled={buttonDisabled}
        >
          Delete User
        </Button>
      </StandardCard>
    </>
  )
}

export default Login;
