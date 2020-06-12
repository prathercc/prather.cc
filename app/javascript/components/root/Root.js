import React, { useContext, useState, useEffect } from 'react';
import AppBar from './components/Appbar/AppBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import SiteLogo from './components/Mainpage/SiteLogo/SiteLogo';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AppContext } from './AppContext';
import background from './images/background.png';
import SoftwareApplication from './components/Software/SoftwareApplication/SoftwareApplication';
import SoftwareTable from './components/Software/SoftwareTable/SoftwareTable';
import NewSoftware from './components/Software/NewSoftware/NewSoftware';
import { getSession } from './authService';
import './components/style.css';
import { getThemeColor } from './components/Utility/Utility';

function Root() {
  const appSettings = useContext(AppContext);
  const { textColor } = appSettings;
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      await getSession(setUserData);
    };
    fetchSession();
  }, []);

  return (
    <div style={{ userSelect: 'none' }}>
      <AppContext.Provider value={appSettings}>
        <Router>
          <AppBar userData={userData} setUserData={setUserData} />
          <div
            style={{
              backgroundColor: getThemeColor(0.3),
              color: textColor,
              textAlign: 'center',
              overflow: 'hidden',
              position: 'relative',
              minHeight: '100vh'
            }}
          >
            <div className='animation1' style={{ position: 'absolute', width: '100%', height: '100%', backgroundImage: `url(${background})`, opacity: 0.75 }}></div>
            <Switch>
              <Route exact path='/software/:name'>
                <SoftwareApplication userData={userData} />
              </Route>
            </Switch>
            <Switch>
              <Route exact path='/software'>
                <SoftwareTable userData={userData} />
              </Route>
              <Route exact path='/software/admin/new'>
                {userData ? <NewSoftware /> : <SiteLogo />}
              </Route>
              <Route exact path='/software/admin/edit/:name'>
                {userData ? <NewSoftware /> : <SiteLogo />}
              </Route>
            </Switch>
            <Switch>
              <Route exact path='/'>
                <SiteLogo />
              </Route>
            </Switch>
          </div>
        </Router>
      </AppContext.Provider>
    </div>
  );
}

export default Root;
