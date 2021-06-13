import React, { useState, useEffect } from "react";
import SoftwareApplication from "./Software/SoftwareApplication/SoftwareApplication";
import { getSession } from "../authService";
import NavMenu from "./NavMenu/NavMenu";
import { Tabs } from "antd";

const MainWrapper = ({
  activeKey: urlKey,
  activeApplication: urlApplication,
}) => {
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
    if (activeApplication) setActiveKey("Application");
  }, [activeApplication]);

  useEffect(() => {
    if (activeKey !== "Application") setActiveApplication(null);
  }, [activeKey]);

  const getMainKeyRoute = (key) => {
    return key === "Home" ? "/" : key === "Software" ? "/software" : "";
  };
  const shouldUpdateRoute = (key) => {
    let arr = ["Github", "Youtube", "UserLogin"];
    return !arr.includes(key) && !key.includes('app:') && !key.includes('user:');
  };
  const handleOnSelect = (e) => {
    if (shouldUpdateRoute(e.key)) {
      setActiveKey(e.key);
      window.history.pushState({}, "", getMainKeyRoute(e.key));
    }
  };

  return (
    <div>
      <NavMenu
        selection={activeKey}
        onSelect={handleOnSelect}
        userData={userData}
        setUserData={setUserData}
        setActiveApplication={(app) => {
          console.log(app);
            setActiveApplication(app);
            window.history.pushState({}, "", `/software/${app}`);
          }}
      />
      <Tabs
        tabBarStyle={{ display: "none" }}
        activeKey={activeKey}
        defaultActiveKey="Home"
        centered
      >
        <Tabs.TabPane tab="Home" key="Home"></Tabs.TabPane>
        <Tabs.TabPane forceRender tab="Application" key="Application">
          <SoftwareApplication userData={userData} name={activeApplication} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default MainWrapper;
