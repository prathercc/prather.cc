import React from "react";
import "./App.css";
import DefaultAppBar from "./components/Default/DefaultAppBar/DefaultAppBar";
import "bootstrap/dist/css/bootstrap.min.css";
import DefaultLogo from "./components/Default/DefaultLogo/DefaultLogo";
import { BreakpointProvider } from "react-socks";

function App() {
  return (
    <BreakpointProvider>
      <div className="App">
        <DefaultAppBar></DefaultAppBar>
        <header className="App-header">
          <DefaultLogo></DefaultLogo>
        </header>
      </div>
    </BreakpointProvider>
  );
}

export default App;
