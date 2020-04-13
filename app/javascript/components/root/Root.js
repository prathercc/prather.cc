import React, { useContext } from 'react';
import AppBar from './components/Mainpage/AppBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Display from './components/Mainpage/Display/Display';
import Footer from './components/Mainpage/Footer';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AppContext } from './AppContext';
import background from './images/background.png';
import Login from './components/Login/Login';
import SoftwareApplication from './components/Software/SoftwareApplication/SoftwareApplication';
import SoftwareTable from './components/Software/SoftwareTable/SoftwareTable';
import NewSoftware from './components/Software/NewSoftware/NewSoftware';
import NewFeature from './components/Software/NewSoftware/NewFeature';

function Root() {
  const appSettings = useContext(AppContext);
  const { bgColor, textColor } = appSettings;
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
              backgroundImage: `url(${background})`,
            }}
          >
            <Switch>
              <Route exact path='/software/:name'>
                <SoftwareApplication />
              </Route>
            </Switch>
            <Switch>
              <Route exact path='/software'>
                <SoftwareTable />
              </Route>
              <Route exact path='/software/admin/new'>
                <NewSoftware />
              </Route>
              <Route exact path='/software/admin/edit/:name'>
                <NewSoftware />
              </Route>
              <Route exact path='/software/admin/feature/new/:name'>
                <NewFeature />
              </Route>
              <Route exact path='/software/admin/feature/edit/:name/:id'>
                <NewFeature />
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
