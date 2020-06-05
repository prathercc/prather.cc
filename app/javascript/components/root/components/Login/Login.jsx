import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { authenticate, clearSession, getSession } from '../../authService';
import { StandardPage, StandardCard, StandardButton } from '../Utility/Utility';
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
    <StandardPage style={{ marginTop: '8vh' }} title='Admin Panel'>
      {userData ? (
        <>
          <StandardButton style={{ minWidth: '25%' }} onClick={() => signOut()}>
            Sign Out
          </StandardButton>
          <AddUser userData={userData} />
          <DeleteUser userData={userData} />
        </>

      ) : (
          <StandardCard style={{ minWidth: '100%' }} title='Sign In'>
            <Form.Group style={{ marginTop: '1vh', minWidth: '40%' }}>
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

              <StandardButton
                style={{ marginTop: '1vh' }}
                onClick={() => authenticateUser()}
              >
                Sign In
            </StandardButton>
            </Form.Group>
          </StandardCard>
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
    <StandardCard title='Create New User' style={{ marginTop: '2vh', minWidth: '100%' }}>
      <Form.Group style={{ width: '40%' }}>
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
        <StandardButton
          style={{ marginTop: '1vh' }}
          onClick={() => handleCreateNewUser()}
          isActive={buttonEnabled}
        >
          Create New User
        </StandardButton>
      </Form.Group>
    </StandardCard>
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
    <StandardCard title='Delete User' style={{ marginTop: '2vh', minWidth: '100%' }}>
      <Form.Group style={{ minWidth: '40%' }}>
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
        <StandardButton
          style={{ marginTop: '1vh' }}
          onClick={() => handleDeleteUser()}
          isActive={!buttonDisabled}
        >
          Delete User
        </StandardButton>
      </Form.Group>
    </StandardCard>
  )
}

export default Login;
