import React, { useContext } from 'react';
import AppBar from './components/Mainpage/AppBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Display from './components/Mainpage/Display/Display';
import Footer from './components/Mainpage/Footer';
import { BreakpointProvider } from 'react-socks';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ClickServant from './components/Software/Applications/ClickServant/ClickServant';
import { AppContext } from './AppContext';
import background from './images/background.png';

function App() {
  const appSettings = useContext(AppContext);
  const { fontStyle, bgColor, textColor } = appSettings;
  return (
    <AppContext.Provider value={appSettings}>
      <Router>
        <BreakpointProvider>
          <AppBar />
          <div
            style={{
              fontFamily: fontStyle,
              backgroundColor: bgColor,
              color: textColor,
              minHeight: '100vh',
              textAlign: 'center',
              border: '1px solid transparent',
              backgroundImage: `url(${background})`
            }}
          >
            <Switch>
              <Route path='/software'>
                <ClickServant />
              </Route>
              <Route path='/'>
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
