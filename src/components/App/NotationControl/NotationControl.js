import React from "react";
import { useMetronomeContext } from "../../../context/context";

const NotationControl = () => {
  const {
    subdivision,
    changeSubdivision,
    barLength,
    increaseBarLength,
    decreaseBarLength,
    isStressing,
    toggleStressing,
  } = useMetronomeContext();

  // FUNCTIONS FOR INCREASING/DECREASING BEAT NUMBER IN BAR

  const beatUp = () => {
    if (barLength < 12) increaseBarLength();
  };

  const beatDown = () => {
    if (barLength > 2) decreaseBarLength();
  };

  return (
    <section>
      <ul>
        <li>
          <button onClick={() => changeSubdivision("Quarter")}>Quarter</button>
        </li>
        <li>
          <button onClick={() => changeSubdivision("Eighth")}>Eighth</button>
        </li>
        <li>
          <button onClick={() => changeSubdivision("Sixteenth")}>
            Sixteenth
          </button>
        </li>
        <li>
          <button onClick={() => changeSubdivision("Triplet")}>Triplet</button>
        </li>
      </ul>

      <div>
        <button onClick={toggleStressing}>Stress</button>
        <div>
          <button onClick={beatDown}>-</button>
          <h3>{barLength}</h3>
          <button onClick={beatUp}>+</button>
        </div>
      </div>
    </section>
  );
};

export default NotationControl;
