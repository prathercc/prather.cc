import React from "react";
import { Navbar, Nav, Image } from "react-bootstrap";
import prathdevbannerlogo from "./prathdevbannerlogo.png";
import { Breakpoint } from "react-socks";

const BannerImage = props => {
  const { width } = props;
  return (
    <Image rounded style={{ height: "auto", width }} src={prathdevbannerlogo} />
  );
};

function DefaultAppBar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>
        <Breakpoint xlarge up>
          <BannerImage width="6vw" />
        </Breakpoint>
        <Breakpoint large down>
          <BannerImage width="20vw" />
        </Breakpoint>
      </Navbar.Brand>
      <Nav>
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/software">Software</Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default DefaultAppBar;
