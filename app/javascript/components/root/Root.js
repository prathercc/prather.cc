import React, { useContext, useState, useEffect } from 'react';
import AppBar from './components/Mainpage/AppBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Display from './components/Mainpage/Display/Display';
import Footer from './components/Mainpage/Footer';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AppContext } from './AppContext';
import background from './images/background.jpg';
import Login from './components/Login/Login';
import SoftwareApplication from './components/Software/SoftwareApplication/SoftwareApplication';
import SoftwareTable from './components/Software/SoftwareTable/SoftwareTable';
import NewSoftware from './components/Software/NewSoftware/NewSoftware';
import NewFeature from './components/Software/NewSoftware/NewFeature';
import { getSession } from './authService';
import './components/Mainpage/Display/Display.css';

function Root() {
  const appSettings = useContext(AppContext);
  const { bgColor, textColor } = appSettings;
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
          <AppBar />
          <div
            style={{
              backgroundColor: bgColor,
              color: textColor,
              minHeight: '100vh',
              textAlign: 'center',
              border: '1px solid transparent',
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            <div className='animation1' style={{ position: 'absolute', backgroundColor: bgColor, width: '100%', height: '100%', backgroundImage: `url(${background}), url(${background})`, opacity: 0.70 }}></div>
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
                {userData ? <NewSoftware /> : <Display />}
              </Route>
              <Route exact path='/software/admin/edit/:name'>
                {userData ? <NewSoftware /> : <Display />}
              </Route>
              <Route exact path='/software/admin/feature/new/:name'>
                {userData ? <NewFeature /> : <Display />}
              </Route>
              <Route exact path='/software/admin/feature/edit/:name/:id'>
                {userData ? <NewFeature /> : <Display />}
              </Route>
            </Switch>
            <Switch>
              <Route exact path='/'>
                <Display />
              </Route>
              <Route exact path='/login'>
                <Login />
              </Route>
            </Switch>
          </div>
          <Footer />
        </Router>
      </AppContext.Provider>
    </div>
  );
}
export default Root;
