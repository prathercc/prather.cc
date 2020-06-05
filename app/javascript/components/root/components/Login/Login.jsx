import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { authenticate, clearSession, getSession } from '../../authService';
import { StandardPage, StandardCard, StandardButton, StandardTextField, StandardDropDown } from '../Utility/Utility';
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
    <StandardPage title='Admin Panel'>
      {userData &&
        <>
          <StandardButton style={{ minWidth: '25%' }} onClick={() => signOut()}>Sign Out</StandardButton>
          <AddUser userData={userData} />
          <DeleteUser userData={userData} />
        </>
      }
      {!userData &&
        <StandardCard style={{ minWidth: '100%' }}>
          <Form.Group style={{ marginTop: '1vh', minWidth: '40%' }}>
            <StandardTextField value={credentials.email} label='Email' onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} />
            <StandardTextField isPassword value={credentials.password} label='Password' onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
            <StandardButton style={{ marginTop: '1vh' }} onClick={() => authenticateUser()}>Sign In</StandardButton>
          </Form.Group>
        </StandardCard>
      }
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
        <StandardTextField value={newUser.email} label='Email' onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
        <StandardTextField isPassword value={newUser.password} label='Password' onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
        <StandardTextField isPassword value={newUser.password2} label='Password Again' onChange={(e) => setNewUser({ ...newUser, password2: e.target.value })} />
        <StandardButton style={{ marginTop: '1vh' }} onClick={() => handleCreateNewUser()} isActive={buttonEnabled}>Create New User</StandardButton>
      </Form.Group>
    </StandardCard>
  )
}

const DeleteUser = ({ userData }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('Make a selection');

  useEffect(() => {
    const fetchUsers = async () => {
      await getUsers(setUsers);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const filterUsers = () => {
      let x = users.map(user => { return ({ id: user.id, name: user.email }) });
      setFilteredUsers(x);
    };
    if (users?.length > 0) {
      filterUsers();
    }
  }, [users]);

  const handleDeleteUser = async () => {
    await deleteUser(selectedUser);
    window.open('/login', '_self');
  };

  const buttonDisabled = (selectedUser === 'Make a selection') || (userData.id.toString() === selectedUser);

  return (
    <StandardCard title='Delete User' style={{ marginTop: '2vh', minWidth: '100%' }}>
      <Form.Group style={{ minWidth: '40%' }}>
        <StandardDropDown value={selectedUser} label='Existing Users' data={filteredUsers} onChange={(e) => setSelectedUser(e.target.value)} />
        <StandardButton style={{ marginTop: '1vh' }} onClick={() => handleDeleteUser()} isActive={!buttonDisabled}>Delete User</StandardButton>
      </Form.Group>
    </StandardCard>
  )
}

export default Login;
