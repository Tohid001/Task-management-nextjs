import React from "react";
import { GlobalReset } from "../../styles/Global.styled";
import Nav from "../Navbar/Navbar";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      {children}
    </>
  );
}

export default Layout;
