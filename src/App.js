import React, { useContext } from 'react';
import AppBar from './components/Mainpage/AppBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Display from './components/Mainpage/Display/Display';
import Footer from './components/Mainpage/Footer';
import { BreakpointProvider } from 'react-socks';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AppContext } from './AppContext';
import background from './images/background.png';
import SoftwareRouting from './components/Routing/SoftwareRouting';
import ClickServant from './components/Software/Applications/ClickServant/ClickServant';
import SoftwareTable from './components/Software/SoftwareTable/SoftwareTable';

function App() {
  const appSettings = useContext(AppContext);
  const { bgColor, textColor } = appSettings;
  return (
    <AppContext.Provider value={appSettings}>
      <Router>
        <BreakpointProvider>
          <AppBar />
          <div
            style={{
              backgroundColor: bgColor,
              color: textColor,
              minHeight: '100vh',
              textAlign: 'center',
              border: '1px solid transparent',
              backgroundImage: `url(${background})`
            }}
          >
            <SoftwareRouting />
            <Switch>
              <Route exact path='/'>
                <Display />
              </Route>
            </Switch>
          </div>
          <Footer />
        </BreakpointProvider>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
