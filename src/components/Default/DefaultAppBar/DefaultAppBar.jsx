import React from "react";
import { Navbar, Nav } from "react-bootstrap";

function DefaultAppBar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">Prath.dev</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/software">Software</Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default DefaultAppBar;
