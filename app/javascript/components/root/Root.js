import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AppContext } from './AppContext';
import MainWrapper from './components/MainWrapper';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'antd/dist/antd.css';
import './components/style.css';
import { Spin } from 'antd';

function Root() {
  const appSettings = useContext(AppContext);
  const { bgColor, standardTitleFontSize, fontStyle } = appSettings;
  const [loading, setLoading] = useState(true);
  window.addEventListener('load', () => { setLoading(false) });
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
          <div style={{ marginTop: '45vh', display: loading ? '' : 'none' }}><Spin size='large' /><p style={{ marginTop: '1vh', fontSize: standardTitleFontSize, fontFamily: fontStyle }}>Loading Prather.cc</p></div>
          <div style={{ opacity: loading ? 0 : 100 }}>
            <div className='starbend' style={{ position: 'absolute', width: '100%', height: '100%', backgroundImage: `url(https://i92.servimg.com/u/f92/11/29/62/29/stars11.png)`, opacity: 0.7 }} />
            <div className='blackhole2' style={{ position: 'absolute', width: '100%', height: '100%', backgroundImage: `url(https://i92.servimg.com/u/f92/11/29/62/29/blackh13.png)` }} />
            <div className='blackhole' style={{ position: 'absolute', width: '100%', height: '100%', backgroundImage: `url(https://i92.servimg.com/u/f92/11/29/62/29/blackh13.png)` }} />
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
        </div>
      </Router>
    </AppContext.Provider>
  );
}
export default Root;
