import React from "react";
import { useMetronomeContext } from "../../../context/context";

const NotationControl = () => {
  const {
    setSubdivision,
    barLength,
    setBarLength,
    setIsStressing,
    isStressing,
    subdivision,
  } = useMetronomeContext();

  // FUNCTIONS FOR INCREASING/DECREASING BEAT NUMBER IN BAR

  const beatUp = () => {
    if (barLength < 12) setBarLength((prev) => prev + 1);
  };

  const beatDown = () => {
    if (barLength > 2) setBarLength((prev) => prev - 1);
  };

  return (
    <section>
      <ul>
        <li>
          <button onClick={() => setSubdivision("Quarter")}>Quarter</button>
        </li>
        <li>
          <button onClick={() => setSubdivision("Eighth")}>Eighth</button>
        </li>
        <li>
          <button onClick={() => setSubdivision("Sixteenth")}>Sixteenth</button>
        </li>
        <li>
          <button onClick={() => setSubdivision("Triplet")}>Triplet</button>
        </li>
      </ul>

      <div>
        <button onClick={() => setIsStressing((prev) => !prev)}>Stress</button>
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
