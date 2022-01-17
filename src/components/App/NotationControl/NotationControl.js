import React from "react";
import { useMetronomeContext } from "../../../context/context";

const NotationControl = () => {
  return (
    <section>
      <ul>
        <li>
          <button>Quarter</button>
        </li>
        <li>
          <button>Eighth</button>
        </li>
        <li>
          <button>Sixteenth</button>
        </li>
        <li>
          <button>Triple</button>
        </li>
      </ul>

      <div>
        <button>Stress</button>
        <div>
          <button>-</button>
          <h3>Bar Length</h3>
          <button>+</button>
        </div>
      </div>
    </section>
  );
};

export default NotationControl;
