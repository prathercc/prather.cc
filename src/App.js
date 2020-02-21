import React from "react";
import "./App.css";
import DefaultAppBar from "./components/Default/DefaultAppBar/DefaultAppBar";
import "bootstrap/dist/css/bootstrap.min.css";
import DefaultLogo from "./components/Default/DefaultLogo/DefaultLogo";

function App() {
  return (
    <>
      <div className="App">
        <DefaultAppBar></DefaultAppBar>
        <header className="App-header">
          <DefaultLogo></DefaultLogo>
        </header>
      </div>
    </>
  );
}

export default App;
