import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <Link
        aria-label="go to metronome application"
        to="/"
        className="nav__logo"
      >
        Swing
      </Link>
      <Link aria-label="go to guide" to="/guide" className="nav__guide">
        Guide
      </Link>
    </nav>
  );
};

export default Nav;
