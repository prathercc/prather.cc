import React from 'react';
import logo from './prathdevhd.png';
import './App.css';
import DefaultDrawer from './components/Default/DefaultDrawer/DefaultDrawer'

function App() {
  return (
    <>
    <DefaultDrawer></DefaultDrawer>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
    
    </>
  );
}

export default App;
