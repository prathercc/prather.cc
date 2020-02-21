import React from "react";
import "./DefaultLogo.css";
import { Image } from "react-bootstrap";
import prathdevtext from "./prathdevtext.png";
import prathdevsplat from "./prathdevsplat.png";

function DefaultLogo() {
  return (
    <>
      <Image
        src={prathdevsplat}
        style={{ width: "30vw", height: "auto" }}
        rounded
      ></Image>
      <Image
        rounded
        className="App-logo"
        style={{ width: "10vw", height: "auto" }}
        src={prathdevtext}
      ></Image>
    </>
  );
}

export default DefaultLogo;
