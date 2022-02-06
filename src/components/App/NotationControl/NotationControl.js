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
    stressFrequency,
    slideStressFrequency,
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
            className={`btn notation-btn ${
              subdivision === "Quarter" && "notation-btn--selected"
            }`}
          >
            Quarter
          </button>
        </li>
        <li className="notation__list-item">
          <button
            onClick={() => changeSubdivision("Eighth")}
            className={`btn notation-btn ${
              subdivision === "Eighth" && "notation-btn--selected"
            }`}
          >
            Eighth
          </button>
        </li>
        <li className="notation__list-item">
          <button
            onClick={() => changeSubdivision("Sixteenth")}
            className={`btn notation-btn ${
              subdivision === "Sixteenth" && "notation-btn--selected"
            }`}
          >
            Sixteenth
          </button>
        </li>
        <li className="notation__list-item">
          <button
            onClick={() => changeSubdivision("Triplet")}
            className={`btn notation-btn ${
              subdivision === "Triplet" && "notation-btn--selected"
            }`}
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
            &ndash;
          </button>
          <h3 className="notation__stress-text">{barLength}</h3>
          <button onClick={beatUp} className="btn down-btn">
            +
          </button>

          <h2 className="notation_stress-frequency-text">
            Stress Frequency: {stressFrequency}
          </h2>
          <input
            className="slider stress-frequency-slider"
            type="range"
            min={200}
            max={4000}
            step={10}
            defaultValue={stressFrequency}
            onChange={(e) => slideStressFrequency(parseInt(e.target.value))}
          />
        </div>
      </div>
    </section>
  );
};

export default NotationControl;
