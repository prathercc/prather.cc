import React, { useContext, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AppContext } from './AppContext';
import './components/style.css';
import MainWrapper from './components/MainWrapper';
import { StandardSpinner, StandardImage } from './components/Utility/Utility';
import Row from 'react-bootstrap/Row';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useCurrentBreakpointName } from 'react-socks';

function Root() {
  const appSettings = useContext(AppContext);
  const { bgColor, standardTitleFontSize, fontStyle } = appSettings;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.addEventListener('load', () => setLoading(false));
  }, []);

  return (
    <AppContext.Provider value={appSettings}>
      <Router>
        <div
          style={{
            backgroundColor: bgColor,
            color: 'white',
            textAlign: 'center',
            overflow: 'hidden',
            position: 'relative',
            minHeight: '100vh',
            userSelect: 'none'
          }}
        >
          <div style={{ marginTop: '45vh', display: loading ? '' : 'none' }}><StandardSpinner style={{ fontSize: '10vw' }} /><p style={{ marginTop: '1vh', fontSize: standardTitleFontSize, fontFamily: fontStyle }}>Loading Prather.cc</p></div>
          <div style={{ opacity: loading ? 0 : 100 }}>
            <div className='starbend' style={{ position: 'absolute', width: '100%', height: '100%', backgroundImage: `url(https://i92.servimg.com/u/f92/11/29/62/29/stars11.png)`, opacity: 0.7 }} />
            <SiteLogo />
            <Switch>
              <Route exact path='/software/:name' component={(props) => <MainWrapper activeApplication={props.match.params.name} activeKey='Software' />} />
            </Switch>
            <Switch>
              <Route exact path='/software' component={() => <MainWrapper activeKey='Software' />} />
            </Switch>
            <Switch>
              <Route exact path='/' component={() => <MainWrapper activeKey='Home' />} />
            </Switch>
            <Switch>
              <Route exact path='/maintenance' component={() => <MainWrapper activeKey='Maintenance' />} />
            </Switch>
          </div>
        </div>
      </Router>
    </AppContext.Provider>
  );
}

function SiteLogo() {
  const breakpoint = useCurrentBreakpointName();
  const { standardTitleFontSize, fontStyle } = useContext(AppContext);
  return (
      <Row style={{
        filter: 'grayscale(0.2)',
        opacity: 1,
        padding: 0,
        maxWidth: 'max-content',
        margin: 'auto',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}>
        <StandardImage
          style={{ width: '20%', borderRadius: '15px', pointerEvents: 'none', minWidth: '170px' }}
          className='siteLogo'
          src='https://i92.servimg.com/u/f92/11/29/62/29/filter20.png'
        />
      </Row>
  );
};

export default Root;
