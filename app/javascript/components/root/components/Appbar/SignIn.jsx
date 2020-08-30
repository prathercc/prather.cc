import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import { StandardTooltip, getIconSizing, StandardButton, StandardModal, StandardTextField } from '../Utility/Utility';
import Form from 'react-bootstrap/Form';
import { authenticate, clearSession } from '../../authService';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { MDBIcon } from "mdbreact";

const SignIn = ({ setUserData, userData, displayAlert, style }) => {
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <>
            <StandardTooltip text={userData ? 'Sign Out' : 'Sign In'}>
                <Nav.Link onClick={() => setModalOpen(true)} style={{ minHeight: '100%', display: 'flex', ...style }} as='span' className='appbarDefault'>
                    <span style={{ fontSize: getIconSizing(), margin: 'auto' }}>
                        <MDBIcon icon="user-circle" />
                    </span>
                </Nav.Link>
            </StandardTooltip>
            <Login userData={userData} displayAlert={displayAlert} setUserData={setUserData} modalOpen={modalOpen} setModalOpen={setModalOpen} />
        </>
    );
};

const Login = ({ setUserData, modalOpen, setModalOpen, displayAlert, userData }) => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    let signInDisabled = credentials.email.length === 0 || credentials.password.length === 0;

    const authenticateUser = async () => {
        const { data } = await authenticate(credentials);
        if (data) {
            setUserData(data);
            setModalOpen(false);
            displayAlert('Successfully signed in', true);
        }
        else {
            displayAlert('Invalid credential combination', false);
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
                    <StandardButton disabled={signInDisabled} onClick={authenticateUser}>Sign In</StandardButton>
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
                        <StandardTextField hasError={credentials.email.length === 0} value={credentials.email} label='Email' onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} />
                        <StandardTextField hasError={credentials.password.length === 0} isPassword value={credentials.password} label='Password' onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
                    </>
                }
            </Form.Group>
        </StandardModal>
    );
};
export default SignIn;
