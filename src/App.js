import React from "react";
import DefaultAppBar from "./components/Default/DefaultAppBar/DefaultAppBar";
import "bootstrap/dist/css/bootstrap.min.css";
import DefaultLogo from "./components/Default/DefaultLogo/DefaultLogo";
import { BreakpointProvider } from "react-socks";

const appStyle = {
  textAlign: "center",
  fontFamily: "Tlwg Typist Bold Oblique",
  backgroundColor: "#666666",
  minHeight: "100vh"
};

function App() {
  return (
    <BreakpointProvider>
      <div style={appStyle}>
        <DefaultAppBar></DefaultAppBar>
        <header style={{ marginTop: "15vh" }}>
          <DefaultLogo />
        </header>
      </div>
    </BreakpointProvider>
  );
}

export default App;
