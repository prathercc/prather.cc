import React, { useState, useEffect, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import { StandardModal, StandardTextField, StandardButton, StandardDropDown, StandardTooltip, getIconSizing } from '../Utility/Utility';
import { getUsers, createUser, deleteUser } from '../../userService';
import AdminIcon from 'react-bootstrap-icons/dist/icons/terminal';
import { AppContext } from '../../AppContext';
import Tab from 'react-bootstrap/Tab';

const Admin = ({ setUserData, userData, displayAlert }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const { fontStyle } = useContext(AppContext);
    return (
        <>
            <StandardTooltip text='Admin Portal'>
                <Nav.Link as='span' style={{ fontFamily: fontStyle, minHeight: '100%', display: 'flex' }} onClick={() => setModalOpen(true)} className='appbarDefault'>
                    <span style={{ margin: 'auto', fontSize: getIconSizing(), lineHeight: 0 }}>
                        <AdminIcon />
                    </span>
                </Nav.Link>
            </StandardTooltip>
            <Manage displayAlert={displayAlert} userData={userData} modalOpen={userData ? modalOpen : false} setModalOpen={setModalOpen} setUserData={setUserData} />
        </>
    );
};

const Manage = ({ userData, setModalOpen, modalOpen, displayAlert }) => {
    const BlankKeys = { Create: false, Delete: false };
    const [activeKey, setActiveKey] = useState({ ...BlankKeys, Create: true });

    /*Delete User*/
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('Make a selection');
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

    const handleDeleteUser = async () => {
        let deleteButtonDisabled = (selectedUser === 'Make a selection') || (userData?.id.toString() === selectedUser);
        if (!deleteButtonDisabled) {
            const { data } = await deleteUser(selectedUser);
            if (data) {
                displayAlert('User deleted successfully', true);
                const { data } = await getUsers();
                setUsers(data);
                setSelectedUser('Make a selection');
            }
            else {
                displayAlert('Network error occured while trying to delete user', false);
            }
        }
        else {
            displayAlert('Make a valid selection and try again', false);
        }
    };
    const DeleteButton = () => {
        return (
            <StandardButton onClick={handleDeleteUser}>Delete User</StandardButton>
        );
    };
    /*******/

    /*New User*/
    const blankUser = { email: '', password: '', password2: '' };
    const [newUser, setNewUser] = useState(blankUser);
    const handleCreateNewUser = async () => {
        let newButtonEnabled = newUser.email.length > 0 && newUser.password.length > 0 && newUser.password === newUser.password2 && newUser.email !== userData.email;
        if (newButtonEnabled) {
            const { data } = await createUser(newUser);
            if (data) {
                displayAlert('User created successfully', true);
                setNewUser(blankUser);
                const { data } = await getUsers();
                setUsers(data);
            }
            else {
                displayAlert('Network error occurred while creating new user', false);
            }
        }
        else {
            displayAlert('Complete the form and try again', false);
        }
    };
    const CreateButton = () => {
        return (
            <StandardButton onClick={handleCreateNewUser}>Create User</StandardButton>
        );
    };
    /*******/

    const buttonDisplayLogic = activeKey.Create ? <CreateButton /> : activeKey.Delete ? <DeleteButton /> : null;

    return (
        <>
            <StandardModal omitPadding title='Admin Portal' buttons={buttonDisplayLogic} modalOpen={modalOpen} handleModalClose={() => setModalOpen(false)}>
                <Tab.Container defaultActiveKey={'Create'}>
                    <ViewSwitcher activeKey={activeKey} setActiveKey={setActiveKey} />
                    <Tab.Content>
                        <Tab.Pane eventKey='Create'>
                            <Form.Group style={{ width: '95%', margin: 'auto', paddingBottom: '15px' }}>
                                <StandardTextField value={newUser.email} label='Email' onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
                                <StandardTextField isPassword value={newUser.password} label='Password' onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
                                <StandardTextField isPassword value={newUser.password2} label='Password Again' onChange={(e) => setNewUser({ ...newUser, password2: e.target.value })} />
                            </Form.Group>
                        </Tab.Pane>
                        <Tab.Pane eventKey='Delete'>
                            <Form.Group style={{ width: '95%', margin: 'auto', paddingBottom: '15px' }}>
                                <StandardDropDown value={selectedUser} label='Users' data={filteredUsers} onChange={(e) => setSelectedUser(e.target.value)} />
                            </Form.Group>
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </StandardModal>
        </>
    );
};

const ViewSwitcher = ({ setActiveKey, activeKey, BlankKeys }) => {
    const padding = { paddingLeft: '15px', paddingRight: '15px', paddingTop: '3px', paddingBottom: '3px' };
    const { standardTitleFontSize } = useContext(AppContext);

    const CustomLink = ({ keyBool, keyText, displayText, icon, style }) => {
        return (
            <Nav.Link as={'div'} className={keyBool ? 'tabsLinkActive' : 'tabsLinkInactive'} style={{ ...padding, ...style, fontSize: standardTitleFontSize, maxWidth: 'max-content', margin: 'auto' }} onClick={() => setActiveKey({ ...BlankKeys, [keyText]: true })} eventKey={keyText}>{icon}<div />{displayText}</Nav.Link>
        );
    };

    return (
        <Nav className='tabsNavBar' style={{ maxWidth: 'max-content', margin: 'auto' }}>
            <Nav.Item className='tabsLeftBorderBlack'>
                <CustomLink keyBool={activeKey.Create} keyText='Create' displayText='Create' />
            </Nav.Item>
            <Nav.Item className='tabsLeftBorderBlack'>
                <CustomLink keyBool={activeKey.Delete} keyText='Delete' displayText='Delete' />
            </Nav.Item>
        </Nav>
    );
};

export default Admin;
