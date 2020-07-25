import React, { useState, useEffect } from 'react';
import AppBar from './Appbar/AppBar';
import SoftwareApplication from './Software/SoftwareApplication/SoftwareApplication';
import SoftwareTable from './Software/SoftwareTable/SoftwareTable';
import SiteLogo from './Mainpage/SiteLogo/SiteLogo';
import { getSession } from '../authService';
import Tab from 'react-bootstrap/Tab';

const MainWrapper = ({ activeKey: urlKey, activeApplication: urlApplication }) => {
    const [userData, setUserData] = useState(null);
    const [activeApplication, setActiveApplication] = useState(urlApplication);
    const [activeKey, setActiveKey] = useState(urlKey);
    useEffect(() => {
        const fetchSession = async () => {
            await getSession(setUserData);
        };
        fetchSession();
    }, []);

    useEffect(() => {
        if (activeApplication)
            setActiveKey('Application');
    }, [activeApplication]);

    useEffect(() => {
        if (activeKey !== 'Application')
            setActiveApplication(null);
    }, [activeKey]);

    const getMainKeyRoute = (key) => {
        return key === 'Home' ? '/' : key === 'Software' ? '/software' : '';
    }

    return (
        <>
            <Tab.Container activeKey={activeKey} onSelect={(key) => { setActiveKey(key); window.history.pushState({}, '', getMainKeyRoute(key)); }}>
                <AppBar userData={userData} setUserData={setUserData} />
                <Tab.Content>
                    <Tab.Pane unmountOnExit eventKey='Home'>
                        <SiteLogo />
                    </Tab.Pane>
                    <Tab.Pane unmountOnExit eventKey='Software'>
                        <SoftwareTable userData={userData} setActiveApplication={(app) => { setActiveApplication(app); window.history.pushState({}, '', `/software/${app}`) }} />
                    </Tab.Pane>
                    <Tab.Pane eventKey='Application'>
                        <SoftwareApplication userData={userData} name={activeApplication} />
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
        </>
    )
}

export default MainWrapper;