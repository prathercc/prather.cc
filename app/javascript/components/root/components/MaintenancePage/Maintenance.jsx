import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { StandardPage, StandardIconButton, StandardModal, StandardTextField, StandardButton, StandardDropDown, getThemeColor, StandardCard } from '../Utility/Utility';
import CreateIcon from 'react-bootstrap-icons/dist/icons/person-plus';
import DeleteIcon from 'react-bootstrap-icons/dist/icons/person-dash';
import UpdateIcon from 'react-bootstrap-icons/dist/icons/person-check';
import UnknownIcon from 'react-bootstrap-icons/dist/icons/question-diamond';
import { getUsers, createUser, deleteUser, updateUser, getUser } from '../../userService';
function Maintenance({ userData, displayAlert, onSelect }) {
    useEffect(() => {
        if (userData?.group !== 'Administrator')
            onSelect('Home');
        else
            onSelect('Maintenance');
    }, [userData])

    return (
        <StandardPage title='Maintenance Portal'>
            <Row style={{ marginTop: '2vh' }}>
                <Col xs={12} md={6} style={{ display: 'flex' }}>
                    <Col style={{ display: 'flex' }}>
                        <div style={{ verticalAlign: 'middle', margin: 'auto' }}>
                            <div style={{ borderBottom: `2px solid ${getThemeColor(0.5)}`, maxWidth: 'max-content', margin: 'auto', color: getThemeColor(1) }}>User Actions</div>
                            <CreateUser userData={userData} displayAlert={displayAlert} />
                            <UpdateUser userData={userData} displayAlert={displayAlert} />
                            <DeleteUser userData={userData} displayAlert={displayAlert} />
                        </div>
                    </Col>
                    <Col style={{ display: 'flex' }}>
                        <div style={{ verticalAlign: 'middle', margin: 'auto' }}>
                            <div style={{ borderBottom: `2px solid ${getThemeColor(0.5)}`, maxWidth: 'max-content', margin: 'auto', color: getThemeColor(1) }}>Site Actions</div>
                            <StandardIconButton disabled style={{ marginTop: '1vh' }} toolTip='TBD' icon={<UnknownIcon />} />
                            <StandardIconButton disabled style={{ marginTop: '1vh' }} toolTip='TBD' icon={<UnknownIcon />} />
                            <StandardIconButton disabled style={{ marginTop: '1vh' }} toolTip='TBD' icon={<UnknownIcon />} />
                        </div>
                    </Col>
                </Col>
                <Col xs={12} md={6} style={{ display: 'flex', marginTop: '1vh' }}>
                    <StandardCard title='Session Information' style={{ verticalAlign: 'middle', minWidth: '100%' }}>
                        <div style={{ color: getThemeColor(1) }}>Email: <span style={{ color: 'white' }}>{userData?.email}</span></div>
                        <div style={{ color: getThemeColor(1) }}>Group: <span style={{ color: 'white' }}>{userData?.group}</span></div>
                        <div style={{ color: getThemeColor(1) }}>Session Token: <span style={{ color: 'white' }}>{userData?.token}</span></div>
                        <div style={{ color: getThemeColor(1) }}>Account Identifier: <span style={{ color: 'white' }}>{userData?.id}</span></div>
                        <div style={{ color: getThemeColor(1) }}>Account Created: <span style={{ color: 'white' }}>{new Date(userData?.created_at).toLocaleDateString()}</span></div>
                        <div style={{ color: getThemeColor(1) }}>Last Sign-in: <span style={{ color: 'white' }}>{new Date(userData?.updated_at).toLocaleDateString()}</span></div>
                    </StandardCard>
                </Col>
            </Row>
        </StandardPage>
    );
};

const UpdateUser = ({ userData, displayAlert }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('Make a selection');
    const [selectedRole, setSelectedRole] = useState('Make a selection');
    const groupOptions = [{ id: 'Administrator', name: 'Administrator' }, { id: 'Moderator', name: 'Moderator' }, { id: 'Member', name: 'Member' }];
    useEffect(() => {
        const fetchUsers = async () => {
            const { data } = await getUsers();
            setUsers(data);
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
    const handleUpdate = async () => {
        const { data } = await updateUser(selectedUser, { group: selectedRole });
        if (data) {
            displayAlert('User updated successfully', true);
            handleModalClose();
        }
        else {
            displayAlert('Network error occured while trying to update user', false);
        }
    }
    const disabledButton = selectedUser === 'Make a selection' || selectedRole === 'Make a selection' || selectedUser === userData?.id.toString();
    const UpdateButton = () => {
        return (
            <StandardButton onClick={handleUpdate} disabled={disabledButton}>Update User</StandardButton>
        );
    };
    const handleModalClose = () => {
        setSelectedUser('Make a selection');
        setModalOpen(false);
    }

    const handleUserSelect = async (e) => {
        setSelectedUser(e.target.value);
        const { data } = await getUser(e.target.value);
        setSelectedRole(data.group || 'Make a selection');
    }
    return (
        <>
            <StandardModal buttons={<UpdateButton />} title='Update User' modalOpen={modalOpen} handleModalClose={handleModalClose}>
                <Form.Group style={{ width: '95%', margin: 'auto', paddingBottom: '15px' }}>
                    <StandardDropDown errorMessage='Select a valid user!' hasError={selectedUser === 'Make a selection' || selectedUser === userData?.id.toString()} value={selectedUser} label='User' data={filteredUsers} onChange={handleUserSelect} />
                    <StandardDropDown isActive={selectedUser !== 'Make a selection'} value={selectedRole} label='Group' data={groupOptions} onChange={(e) => setSelectedRole(e.target.value)} />
                </Form.Group>
            </StandardModal>
            <StandardIconButton style={{ marginTop: '1vh' }} onClick={() => setModalOpen(true)} toolTip='Update User' icon={<UpdateIcon />} />
        </>
    )
}

const DeleteUser = ({ userData, displayAlert }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('Make a selection');
    const deleteButtonDisabled = selectedUser === 'Make a selection' || userData?.id.toString() === selectedUser;
    useEffect(() => {
        const fetchUsers = async () => {
            const { data } = await getUsers();
            setUsers(data);
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

    const handleModalClose = () => {
        setSelectedUser('Make a selection');
        setModalOpen(false);
    }
    const handleDeleteUser = async () => {
        const { data } = await deleteUser(selectedUser);
        if (data) {
            displayAlert('User deleted successfully', true);
            handleModalClose();
        }
        else {
            displayAlert('Network error occured while trying to delete user', false);
        }
    };
    const DeleteButton = () => {
        return (
            <StandardButton disabled={deleteButtonDisabled} onClick={handleDeleteUser}>Delete User</StandardButton>
        );
    };

    return (
        <>
            <StandardModal buttons={<DeleteButton />} title='Delete User' modalOpen={modalOpen} handleModalClose={handleModalClose}>
                <Form.Group style={{ width: '95%', margin: 'auto', paddingBottom: '15px' }}>
                    <StandardDropDown errorMessage='Selection must be valid' hasError={deleteButtonDisabled} value={selectedUser} label='User' data={filteredUsers} onChange={(e) => setSelectedUser(e.target.value)} />
                </Form.Group>
            </StandardModal>
            <StandardIconButton style={{ marginTop: '1vh' }} onClick={() => setModalOpen(true)} toolTip='Delete User' icon={<DeleteIcon />} />
        </>
    );
};

const CreateUser = ({ userData, displayAlert }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const blankUser = { email: '', password: '', password2: '', group: 'Member' };
    const [newUser, setNewUser] = useState(blankUser);
    const newButtonDisabled = newUser.email.length === 0 || newUser.password.length === 0 || newUser.password2 !== newUser.password
        || newUser.email === userData.email || !newUser.email.includes('.') || !newUser.email.includes('@');
    const handleCreateNewUser = async () => {
        const { data } = await createUser(newUser);
        if (data) {
            displayAlert('User created successfully', true);
            handleModalClose();
        }
        else {
            displayAlert('Network error occurred while creating new user', false);
        }
    };
    const CreateButton = () => {
        return (
            <StandardButton disabled={newButtonDisabled} onClick={handleCreateNewUser}>Create User</StandardButton>
        );
    };

    const handleModalClose = () => {
        setNewUser(blankUser);
        setModalOpen(false);
    }
    return (
        <>
            <StandardModal buttons={<CreateButton />} title='Create User' modalOpen={modalOpen} handleModalClose={handleModalClose}>
                <Form.Group style={{ width: '95%', margin: 'auto', paddingBottom: '15px' }}>
                    <StandardTextField errorMessage='A valid email address is required!' hasError={newUser.email.length === 0 || !newUser.email.includes('.') || !newUser.email.includes('@')} value={newUser.email} label='Email' onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
                    <StandardTextField errorMessage='A valid password is required!' hasError={newUser.password.length === 0} isPassword value={newUser.password} label='Password' onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
                    <StandardTextField errorMessage='Passwords must match!' hasError={newUser.password2 !== newUser.password} isPassword value={newUser.password2} label='Password Again' onChange={(e) => setNewUser({ ...newUser, password2: e.target.value })} />
                </Form.Group>
            </StandardModal>
            <StandardIconButton style={{ marginTop: '1vh' }} onClick={() => setModalOpen(true)} toolTip='Create User' icon={<CreateIcon />} />
        </>
    );
};

export default Maintenance;
