import React from "react";
import Link from "next/link";
import { NavBar, NavLink } from "./Navbar.styled.js";

function Nav() {
  return (
    <NavBar>
      <Link href="/createTask">
        <a>Create Task</a>
      </Link>
      <Link href="/timeRegistry">
        <a>Time registry</a>
      </Link>
    </NavBar>
  );
}

export default Nav;
