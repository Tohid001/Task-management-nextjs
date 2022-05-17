import React from "react";
import { GlobalReset } from "../../styles/Global.styled.js";
import Nav from "../Navbar/Navbar.jsx";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GlobalReset />
      <Nav />
      {children}
    </>
  );
}

export default Layout;
