import React, { useState, useEffect } from 'react';
import AppBar from './Appbar/AppBar';
import SoftwareApplication from './Software/SoftwareApplication/SoftwareApplication';
import SoftwareTable from './Software/SoftwareTable/SoftwareTable';
import { getSession } from '../authService';
import Tab from 'react-bootstrap/Tab';
import { StandardAlert } from './Utility/Utility';
import Maintenance from './MaintenancePage/Maintenance';

const MainWrapper = ({ activeKey: urlKey, activeApplication: urlApplication }) => {
    const [alertObject, setAlertObject] = useState({ text: '', success: false, open: false });
    const [userData, setUserData] = useState(null);
    const [activeApplication, setActiveApplication] = useState(urlApplication);
    const [activeKey, setActiveKey] = useState(urlKey);
    useEffect(() => {
        const fetchSession = async () => {
            const { data } = await getSession();
            setUserData(data);
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
        return key === 'Home' ? '/' : key === 'Software' ? '/software' : key === 'Maintenance' ? '/maintenance' : '';
    }
    const handleOnSelect = (key) => {
        setActiveKey(key);
        window.history.pushState({}, '', getMainKeyRoute(key));
    }

    const displayAlert = (text, success) => {
        setAlertObject({ text: text, success: success, open: true });
    }

    return (
        <Tab.Container activeKey={activeKey}>
            <AppBar displayAlert={displayAlert} onSelect={handleOnSelect} userData={userData} setUserData={setUserData} />
            <Tab.Content>
                <Tab.Pane unmountOnExit eventKey='Home'>
                </Tab.Pane>
                <Tab.Pane unmountOnExit eventKey='Software'>
                    <SoftwareTable displayAlert={displayAlert} userData={userData} setActiveApplication={(app) => { setActiveApplication(app); window.history.pushState({}, '', `/software/${app}`) }} />
                </Tab.Pane>
                <Tab.Pane eventKey='Application'>
                    <SoftwareApplication displayAlert={displayAlert} userData={userData} name={activeApplication} />
                </Tab.Pane>
                <Tab.Pane unmountOnExit eventKey='Maintenance'>
                    <Maintenance onSelect={handleOnSelect} displayAlert={displayAlert} userData={userData} />
                </Tab.Pane>
                <StandardAlert success={alertObject.success} text={alertObject.text} alertOpen={alertObject.open} setAlertOpen={(val) => setAlertObject({ ...alertObject, open: val })} />
            </Tab.Content>
        </Tab.Container>
    )
}

export default MainWrapper;