import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <Link to="/" className="nav__logo">
        Swing
      </Link>
      <Link to="/guide" className="nav__guide">
        Guide
      </Link>
    </nav>
  );
};

export default Nav;
