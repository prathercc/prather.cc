import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AppContext } from './AppContext';
import stars from './images/stars.png';
import blackhole from './images/blackhole.png';
import './components/style.css';
import MainWrapper from './components/MainWrapper';
import './components/Mainpage/SiteLogo/SiteLogo.css';

function Root() {
  const appSettings = useContext(AppContext);
  const { textColor } = appSettings;

  return (
    <AppContext.Provider value={appSettings}>
      <Router>
        <div
          style={{
            backgroundColor: '#1a1a1a',
            color: textColor,
            textAlign: 'center',
            overflow: 'hidden',
            position: 'relative',
            minHeight: '100vh',
            userSelect: 'none'
          }}
        >
          <div className='starCW' style={{ position: 'absolute', width: '100%', height: '100%', backgroundImage: `url(${stars})`, opacity: 0.85 }}></div>
          <div className='starCCW' style={{ position: 'absolute', width: '100%', height: '100%', backgroundImage: `url(${stars})`, opacity: 0.85 }}></div>
          <div className='blackhole' style={{ position: 'absolute', width: '100%', height: '100%', backgroundImage: `url(${blackhole})`, opacity: 0.85 }}></div>
          <Switch>
            <Route exact path='/software/:name' component={(props) => <MainWrapper activeApplication={props.match.params.name} activeKey='Software' />} />
          </Switch>
          <Switch>
            <Route exact path='/software' component={() => <MainWrapper activeKey='Software' />} />
          </Switch>
          <Switch>
            <Route exact path='/' component={() => <MainWrapper activeKey='Home' />} />
          </Switch>
        </div>
      </Router>
    </AppContext.Provider>
  );
}

export default Root;
