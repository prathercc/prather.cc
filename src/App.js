import React from "react";
import DefaultAppBar from "./components/Default/DefaultAppBar/DefaultAppBar";
import "bootstrap/dist/css/bootstrap.min.css";
import DefaultLogo from "./components/Default/DefaultLogo/DefaultLogo";
import { BreakpointProvider } from "react-socks";

const appStyle = {
  "background-color": "#666666",
  "min-height": "100vh",
  display: "flex",
  "flex-direction": "column",
  "align-items": "center",
  "justify-content": "center",
  "font-size": "calc(10px + 2vmin)",
  color: "white"
};

function App() {
  return (
    <BreakpointProvider>
      <div style={{ "text-align": "center" }}>
        <DefaultAppBar></DefaultAppBar>
        <header style={appStyle}>
          <DefaultLogo></DefaultLogo>
        </header>
      </div>
    </BreakpointProvider>
  );
}

export default App;
