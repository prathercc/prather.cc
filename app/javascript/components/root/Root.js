import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AppContext } from './AppContext';
import background from './images/background.jpg';
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
            backgroundColor: 'white',
            color: textColor,
            textAlign: 'center',
            overflow: 'hidden',
            position: 'relative',
            minHeight: '100vh',
            userSelect: 'none'
          }}
        >
          <div style={{ position: 'absolute', width: '100%', height: '100%', backgroundImage: `url(${background})`, opacity: 1, backgroundSize: 'cover' }}></div>
          <div className='animation1' style={{ position: 'absolute', width: '100%', height: '100%', backgroundImage: `url(${background})`, opacity: 1 }}></div>
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
