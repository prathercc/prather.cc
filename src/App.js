import React, { useContext } from 'react';
import DefaultAppBar from './components/Default/DefaultAppBar/DefaultAppBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import DefaultLogo from './components/Default/DefaultLogo/DefaultLogo';
import { BreakpointProvider } from 'react-socks';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ClickServant from './components/Software/ClickServant/ClickServant';
import { AppContext } from './AppContext';

function App() {
  const appSettings = useContext(AppContext);
  const { fontStyle, bgColor, textColor } = appSettings;
  console.log(appSettings);
  return (
    <AppContext.Provider value={appSettings}>
      <Router>
        <BreakpointProvider>
          <div
            style={{
              fontFamily: fontStyle,
              backgroundColor: bgColor,
              color: textColor,
              minHeight: '100vh',
              textAlign: 'center',
              border:'1px solid transparent'
            }}
          >
            <DefaultAppBar />
            <Switch>
              <Route path='/software'>
                <ClickServant />
              </Route>
              <Route path='/'>
                <DefaultLogo />
              </Route>
            </Switch>
          </div>
        </BreakpointProvider>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
