import React, { useState, useEffect } from 'react';
import SoftwareApplication from './Software/SoftwareApplication/SoftwareApplication';
import SoftwareTable from './Software/SoftwareTable/SoftwareTable';
import { getSession } from '../authService';
import NavMenu from './NavMenu/NavMenu';
import { Tabs } from 'antd';

const MainWrapper = ({ activeKey: urlKey, activeApplication: urlApplication }) => {
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
        return key === 'Home' ? '/' : key === 'Software' ? '/software' : '';
    }
    const handleOnSelect = (key) => {
        setActiveKey(key);
        window.history.pushState({}, '', getMainKeyRoute(key));
    }

    return (
        <Tabs tabBarStyle={{ display: 'none' }} activeKey={activeKey} defaultActiveKey='Home' centered>
            <NavMenu selection={activeKey} onSelect={handleOnSelect} userData={userData} setUserData={setUserData} />
            <Tabs.TabPane tab='Home' key='Home'></Tabs.TabPane>
            <Tabs.TabPane tab='Software' key='Software'><SoftwareTable userData={userData} setActiveApplication={(app) => { setActiveApplication(app); window.history.pushState({}, '', `/software/${app}`) }} /></Tabs.TabPane>
            <Tabs.TabPane forceRender tab='Application' key='Application'><SoftwareApplication userData={userData} name={activeApplication} /></Tabs.TabPane>
        </Tabs>
    )
}

export default MainWrapper;