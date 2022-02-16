import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="not-found">
      <h1 className="not-found__header">404 - Not Found!</h1>
      <h2 className="not-found__link-text">
        Go to <Link to="/">Swing Metronome</Link>
      </h2>
    </main>
  );
};

export default NotFound;
