import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import { StandardTooltip, getIconSizing, StandardButton, StandardModal, StandardTextField } from '../Utility/Utility';
import SignInIcon from 'react-bootstrap-icons/dist/icons/person';
import Form from 'react-bootstrap/Form';
import { authenticate, clearSession } from '../../authService';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const SignIn = ({ setUserData, userData, displayAlert }) => {
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <>
            <StandardTooltip text={userData ? 'Sign Out' : 'Sign In'}>
                <Nav.Link onClick={() => setModalOpen(true)} style={{ minHeight: '100%', display: 'flex' }} as='span' className='appbarDefault'>
                    <span style={{ fontSize: getIconSizing('large'), margin: 'auto', lineHeight: 0 }}>
                        <SignInIcon />
                    </span>
                </Nav.Link>
            </StandardTooltip>
            <Login userData={userData} displayAlert={displayAlert} setUserData={setUserData} modalOpen={modalOpen} setModalOpen={setModalOpen} />
        </>
    );
};

const Login = ({ setUserData, modalOpen, setModalOpen, displayAlert, userData }) => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const authenticateUser = async () => {
        let canAuthenticate = credentials.email.length > 0 && credentials.password.length > 0;
        if (canAuthenticate) {
            const { data } = await authenticate(credentials);
            if (data) {
                setUserData(data);
                setModalOpen(false);
                displayAlert('Successfully signed in', true);
            }
            else {
                displayAlert('Invalid credential combination', false);
            }
        }
        else {
            displayAlert('Complete the form and try again', false);
        }
    };
    const signOut = async () => {
        const { data } = await clearSession(userData.id);
        setUserData(data);
        setModalOpen(false);
        displayAlert('You have been signed out', true);
    };
    const SignInButton = () => {
        return (
            <Row>
                <Col>
                    <StandardButton onClick={() => setModalOpen(false)}>Cancel</StandardButton>
                </Col>
                <Col>
                    <StandardButton onClick={authenticateUser}>Sign In</StandardButton>
                </Col>
            </Row>

        );
    };
    const SignOutButton = () => {
        return (
            <Row>
                <Col>
                    <StandardButton onClick={() => setModalOpen(false)}>Cancel</StandardButton>
                </Col>
                <Col>
                    <StandardButton onClick={signOut}>Sign Out</StandardButton>
                </Col>
            </Row>
        );
    };
    return (
        <StandardModal title={userData ? 'Sign Out' : 'Sign In'} buttons={userData ? <SignOutButton /> : <SignInButton />} modalOpen={modalOpen} handleModalClose={() => setModalOpen(false)}>
            <Form.Group style={{ width: '95%', margin: 'auto', paddingBottom: '15px' }}>
                {userData && 'Are you sure you want to sign out?'}
                {
                    !userData && <>
                        <StandardTextField value={credentials.email} label='Email' onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} />
                        <StandardTextField isPassword value={credentials.password} label='Password' onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
                    </>
                }
            </Form.Group>
        </StandardModal>
    );
};
export default SignIn;
