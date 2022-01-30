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
    <section className="notation">
      <ul className="notation__list">
        <li className="notation__list-item">
          <button
            onClick={() => changeSubdivision("Quarter")}
            className="btn notation-btn"
          >
            Quarter
          </button>
        </li>
        <li className="notation__list-item">
          <button
            onClick={() => changeSubdivision("Eighth")}
            className="btn notation-btn"
          >
            Eighth
          </button>
        </li>
        <li className="notation__list-item">
          <button
            onClick={() => changeSubdivision("Sixteenth")}
            className="btn notation-btn"
          >
            Sixteenth
          </button>
        </li>
        <li className="notation__list-item">
          <button
            onClick={() => changeSubdivision("Triplet")}
            className="btn notation-btn"
          >
            Triplet
          </button>
        </li>
      </ul>

      <div className="notation__stress">
        <button onClick={toggleStressing} className="btn toggle-stress-btn">
          Stress
        </button>
        <div className="notation__stress-control">
          <button onClick={beatDown} className="btn up-btn">
            -
          </button>
          <h3 className="notation__stress-text">{barLength}</h3>
          <button onClick={beatUp} className="btn down-btn">
            +
          </button>
        </div>
      </div>
    </section>
  );
};

export default NotationControl;
