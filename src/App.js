import React from "react";
import DefaultAppBar from "./components/Default/DefaultAppBar/DefaultAppBar";
import "bootstrap/dist/css/bootstrap.min.css";
import DefaultLogo from "./components/Default/DefaultLogo/DefaultLogo";
import { BreakpointProvider } from "react-socks";

const appStyle = {
  backgroundColor: "#666666",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "calc(10px + 2vmin)",
  color: "white"
};

function App() {
  return (
    <BreakpointProvider>
      <div style={{ textAlign: "center" }}>
        <DefaultAppBar></DefaultAppBar>
        <header style={appStyle}>
          <DefaultLogo></DefaultLogo>
        </header>
      </div>
    </BreakpointProvider>
  );
}

export default App;
