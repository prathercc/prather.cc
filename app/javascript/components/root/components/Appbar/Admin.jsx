import React, { useContext, useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import { AppContext } from '../../AppContext';
import { getThemeColor, StandardModal, StandardCard, StandardTextField, StandardButton, StandardDropDown } from '../Utility/Utility';
import { getUsers, createUser, deleteUser } from '../../userService';
import { authenticate, clearSession } from '../../authService';

const Admin = ({ setUserData, userData }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const appSettings = useContext(AppContext);
    const { appbarFontSize } = appSettings;

    return (
        <>
            <Navbar.Brand style={{ fontSize: appbarFontSize }} onClick={() => setModalOpen(true)}>
                <div className='brandMouseOver' style={{ color: getThemeColor(1), cursor: 'pointer' }}>Prather.cc</div>
            </Navbar.Brand>
            {!userData && <Login modalOpen={modalOpen} setModalOpen={setModalOpen} setUserData={setUserData} />}
            {userData && <Manage userData={userData} modalOpen={modalOpen} setModalOpen={setModalOpen} setUserData={setUserData} />}
        </>
    )
}

const Login = ({ setUserData, modalOpen, setModalOpen }) => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const authenticateUser = async () => {
        await authenticate(credentials, setUserData);
    };
    const SignInButton = <StandardButton isActive={credentials.email.length > 0 && credentials.password.length > 0} onClick={() => authenticateUser()}>Sign In</StandardButton>
    return (
        <>
            <StandardModal buttons={SignInButton} modalOpen={modalOpen} handleModalClose={() => setModalOpen(false)}>
                <StandardCard title='Sign In'>
                    <Form.Group style={{ marginTop: '1vh', minWidth: '95%' }}>
                        <StandardTextField value={credentials.email} label='Email' onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} />
                        <StandardTextField isPassword value={credentials.password} label='Password' onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
                    </Form.Group>
                </StandardCard>
            </StandardModal>
        </>
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
    const handleDeleteUser = async () => { await deleteUser(selectedUser); await getUsers(setUsers); };
    const deleteButtonDisabled = (selectedUser === 'Make a selection') || (userData.id.toString() === selectedUser);
    /*******/

    /*New User*/
    const blankUser = { email: '', password: '', password2: '' };
    const [newUser, setNewUser] = useState(blankUser);
    const newButtonEnabled = newUser.email.length > 0 && newUser.password.length > 0 && newUser.password === newUser.password2 && newUser.email !== userData.email;
    const handleCreateNewUser = async () => { await createUser(newUser); setNewUser(blankUser); await getUsers(setUsers); }
    const signOut = async () => { await clearSession(setUserData, userData.id); };
    const signOutButton = <StandardButton onClick={() => signOut()}>Sign Out</StandardButton>;
    /*******/

    return (
        <>
            <StandardModal buttons={signOutButton} modalOpen={modalOpen} handleModalClose={() => setModalOpen(false)}>
                <StandardCard title='Create New User' style={{ minWidth: '100%', outline: `1px solid ${getThemeColor(0.2)}` }}>
                    <Form.Group style={{ width: '95%' }}>
                        <StandardTextField value={newUser.email} label='Email' onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
                        <StandardTextField isPassword value={newUser.password} label='Password' onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
                        <StandardTextField isPassword value={newUser.password2} label='Password Again' onChange={(e) => setNewUser({ ...newUser, password2: e.target.value })} />
                        <StandardButton style={{ marginTop: '1vh' }} onClick={() => handleCreateNewUser()} isActive={newButtonEnabled}>Create New User</StandardButton>
                    </Form.Group>
                </StandardCard>
                <StandardCard title='Delete User' style={{ minWidth: '100%', outline: `1px solid ${getThemeColor(0.2)}`, marginTop: '1vh' }}>
                    <Form.Group style={{ minWidth: '95%' }}>
                        <StandardDropDown value={selectedUser} label='Existing Users' data={filteredUsers} onChange={(e) => setSelectedUser(e.target.value)} />
                        <StandardButton style={{ marginTop: '1vh' }} onClick={() => handleDeleteUser()} isActive={!deleteButtonDisabled}>Delete User</StandardButton>
                    </Form.Group>
                </StandardCard>
            </StandardModal>
        </>
    )
}

export default Admin;