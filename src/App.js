import React from "react";
import logo from "./prathdevhd.png";
import "./App.css";
import DefaultAppBar from "./components/Default/DefaultAppBar/DefaultAppBar";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <div className="App">
        <DefaultAppBar></DefaultAppBar>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
      </div>
    </>
  );
}

export default App;
