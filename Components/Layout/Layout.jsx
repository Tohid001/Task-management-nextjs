import React from "react";
import { GlobalReset } from "../../styles/Global.styled.js";
import Nav from "../Navbar/Navbar.js";

function Layout({ children }) {
  return (
    <>
      <GlobalReset />
      <Nav />
      {children}
    </>
  );
}

export default Layout;
