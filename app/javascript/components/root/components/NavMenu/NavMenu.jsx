import React, { useContext, useState } from 'react';
import { StandardIconButton, StandardButton, StandardLinkModal, getThemeColor, StandardModal, toggleNotification } from '../Utility/Utility';
import { AppContext } from '../../AppContext';
import { Drawer, Row, Col, Form, Input } from 'antd';
import { VerticalLeftOutlined, YoutubeFilled, GithubFilled, UserOutlined } from '@ant-design/icons';
import { authenticate, clearSession } from '../../authService';
import Maintenance from './Maintenance';

function NavMenu({ onSelect, userData, setUserData, selection }) {
    const { standardTitleFontSize, fontStyle } = useContext(AppContext);
    const [drawerOpen, setDrawerOpen] = useState(false);
    return (
        <>
            <div className='menuBar' onClick={() => setDrawerOpen(true)}>
                <VerticalLeftOutlined style={{ color: 'white', fontSize: standardTitleFontSize, fontFamily: fontStyle, top: '50%', left: '15%', position: 'fixed' }} />
            </div>
            <Drawer footer={<DrawerFooter userData={userData} setUserData={setUserData} />} title='Prather.cc' closable={false} placement='left' onClose={() => setDrawerOpen(false)} visible={drawerOpen}>
                <StandardButton disabled={selection === 'Home'} style={{ marginBottom: '1vh' }} onClick={() => { onSelect('Home'); setDrawerOpen(false); }}>Home</StandardButton>
                <StandardButton disabled={selection === 'Software'} onClick={() => { onSelect('Software'); setDrawerOpen(false); }}>Software</StandardButton>
            </Drawer>
        </>
    );
};

const DrawerFooter = ({ userData, setUserData }) => {
    return (
        <>
            <Row>
                <Col span={8}>
                    <Youtube />
                </Col>
                <Col span={8}>
                    <Github />
                </Col>
                <Col span={8}>
                    <Login setUserData={setUserData} userData={userData} />
                </Col>
            </Row>
            {userData && <Maintenance userData={userData} />}
        </>
    )
}

const Github = () => {
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <>
            <StandardIconButton onClick={() => setModalOpen(true)} toolTip='GitHub' icon={<GithubFilled />} />
            <StandardLinkModal modalOpen={modalOpen} handleModalClose={() => setModalOpen(false)} link='https://github.com/prathercc'>
                Open the official <span style={{ color: getThemeColor(1) }}>Prather.cc</span> GitHub page?
            </StandardLinkModal>
        </>
    );
};

const Youtube = () => {
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <>
            <StandardIconButton onClick={() => setModalOpen(true)} toolTip='YouTube' icon={<YoutubeFilled />} />
            <StandardLinkModal modalOpen={modalOpen} handleModalClose={() => setModalOpen(false)} link='https://www.youtube.com/channel/UC7_J0pO4THZ_QqQWqXwRl3w'>
                Open the official <span style={{ color: getThemeColor(1) }}>Prather.cc</span> YouTube page?
            </StandardLinkModal>
        </>
    );
};

const Login = ({ setUserData, userData }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    let signInDisabled = credentials.email.length === 0 || credentials.password.length === 0;
    const [form] = Form.useForm();
    const authenticateUser = async () => {
        const { data } = await authenticate(credentials);
        if (data) {
            setUserData(data);
            setModalOpen(false);
            toggleNotification('success', 'Success', 'Successfully signed in!');
        }
        else {
            toggleNotification('error', 'Failure', 'Failed to authenticate credentials!');
        }
    };
    const signOut = async () => {
        const { data } = await clearSession(userData.id);
        setUserData(data);
        setModalOpen(false);
        toggleNotification('success', 'Success', 'Successfully signed out!');
    };

    const Buttons = () => {
        return (
            <Row>
                <Col span={12}>
                    <StandardButton onClick={() => setModalOpen(false)}>Cancel</StandardButton>
                </Col>
                <Col span={12}>
                    <StandardButton disabled={signInDisabled && !userData} onClick={userData ? signOut : authenticateUser}>Sign {userData ? 'Out' : 'In'}</StandardButton>
                </Col>
            </Row>
        )
    }
    return (
        <>
            <StandardIconButton onClick={() => setModalOpen(true)} toolTip={userData ? 'Sign-Out' : 'Sign-In'} icon={<UserOutlined />} />
            <StandardModal title={userData ? 'Sign Out' : 'Sign In'} buttons={<Buttons />} modalOpen={modalOpen} handleModalClose={() => setModalOpen(false)}>
                {userData && 'Are you sure you want to sign out?'}
                {!userData && <Form initialValues={{ ...credentials }} onValuesChange={(e) => setCredentials({ ...credentials, ...e })} form={form} layout='vertical'>
                    <Form.Item name='email' label='Email'>
                        <Input placeholder='Type an email address' />
                    </Form.Item>
                    <Form.Item name='password' label='Password'>
                        <Input.Password placeholder='Type a password' />
                    </Form.Item>
                </Form>}
            </StandardModal>
        </>
    );
};

export default NavMenu;
