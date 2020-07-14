import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { getThemeColor, StandardModal, StandardCard, StandardTextField, StandardButton, StandardDropDown } from '../Utility/Utility';
import { getUsers, createUser, deleteUser } from '../../userService';
import { authenticate, clearSession } from '../../authService';

const Admin = ({ setUserData, userData }) => {
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <>
            <div onClick={() => setModalOpen(true)} className='defaultMouseOver' style={{ cursor: 'pointer' }}>Prather.cc</div>
            <Login modalOpen={!userData ? modalOpen : false} setModalOpen={setModalOpen} setUserData={setUserData} />
            <Manage userData={userData} modalOpen={userData ? modalOpen : false} setModalOpen={setModalOpen} setUserData={setUserData} />
        </>
    )
}

const Login = ({ setUserData, modalOpen, setModalOpen }) => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const authenticateUser = async () => {
        await authenticate(credentials, setUserData);
        setModalOpen(false);
    };
    const SignInButton = <StandardButton isActive={credentials.email.length > 0 && credentials.password.length > 0} onClick={() => authenticateUser()}>Sign In</StandardButton>
    return (
        <StandardModal title='Admin Panel' buttons={SignInButton} modalOpen={modalOpen} handleModalClose={() => setModalOpen(false)}>
            <Form.Group style={{ width: '95%', margin: 'auto', paddingBottom: '15px' }}>
                <StandardTextField value={credentials.email} label='Email' onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} />
                <StandardTextField isPassword value={credentials.password} label='Password' onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
            </Form.Group>
        </StandardModal>
    );
};

const Manage = ({ setUserData, userData, setModalOpen, modalOpen }) => {

    /*Delete User*/
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('Make a selection');
    useEffect(() => {
        const fetchUsers = async () => {
            await getUsers(setUsers);
        };
        if (userData && modalOpen) {
            fetchUsers();
        }
    }, [userData, modalOpen]);
    useEffect(() => {
        const filterUsers = () => {
            let x = users.map(user => { return ({ id: user.id, name: user.email }) });
            setFilteredUsers(x);
        };
        if (users?.length > 0) {
            filterUsers();
        }
    }, [users]);
    const handleDeleteUser = async () => { await deleteUser(selectedUser); await getUsers(setUsers); };
    const deleteButtonDisabled = (selectedUser === 'Make a selection') || (userData?.id.toString() === selectedUser);
    /*******/

    /*New User*/
    const blankUser = { email: '', password: '', password2: '' };
    const [newUser, setNewUser] = useState(blankUser);
    const newButtonEnabled = newUser.email.length > 0 && newUser.password.length > 0 && newUser.password === newUser.password2 && newUser.email !== userData.email;
    const handleCreateNewUser = async () => { await createUser(newUser); setNewUser(blankUser); await getUsers(setUsers); }
    const signOut = async () => { await clearSession(setUserData, userData.id); setModalOpen(false); };
    const signOutButton = <StandardButton onClick={() => signOut()}>Sign Out</StandardButton>;
    /*******/

    return (
        <StandardModal title='Admin Panel' buttons={signOutButton} modalOpen={modalOpen} handleModalClose={() => setModalOpen(false)}>
            <Form.Group style={{ width: '95%', margin: 'auto', paddingBottom: '15px' }}>
                <StandardTextField value={newUser.email} label='Email' onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
                <StandardTextField isPassword value={newUser.password} label='Password' onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
                <StandardTextField isPassword value={newUser.password2} label='Password Again' onChange={(e) => setNewUser({ ...newUser, password2: e.target.value })} />
                <StandardButton style={{ marginTop: '1vh' }} onClick={() => handleCreateNewUser()} isActive={newButtonEnabled}>Create New User</StandardButton>
            </Form.Group>
            <Form.Group style={{ width: '95%', margin: 'auto', paddingBottom: '15px' }}>
                <StandardDropDown value={selectedUser} label='Users' data={filteredUsers} onChange={(e) => setSelectedUser(e.target.value)} />
                <StandardButton style={{ marginTop: '1vh' }} onClick={() => handleDeleteUser()} isActive={!deleteButtonDisabled}>Delete User</StandardButton>
            </Form.Group>
        </StandardModal>
    )
}

export default Admin;
