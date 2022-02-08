import React, { useRef } from "react";
import { useMetronomeContext } from "../../../../../context/context";

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

  const rangeRef = useRef();

  // FUNCTIONS FOR INCREASING/DECREASING BEAT NUMBER IN BAR

  const beatUp = () => {
    if (barLength < 12) increaseBarLength();
  };

  const beatDown = () => {
    if (barLength > 2) decreaseBarLength();
  };

  const stressUp = () => {
    if (stressFrequency < rangeRef.current.max)
      slideStressFrequency(stressFrequency + rangeRef.current.step);
  };

  const stressDown = () => {
    if (stressFrequency > rangeRef.current.min)
      slideStressFrequency(stressFrequency - rangeRef.current.step);
  };

  return (
    <section className="notation">
      <ul className="notation__list">
        <li className="notation__list-item">
          <button
            onClick={() => changeSubdivision("First")}
            className={`btn radio-btn ${
              subdivision === "First" && "radio-btn--selected"
            }`}
          >
            First
          </button>
        </li>
        <li className="notation__list-item">
          <button
            onClick={() => changeSubdivision("Eighth")}
            className={`btn radio-btn ${
              subdivision === "Eighth" && "radio-btn--selected"
            }`}
          >
            Eighth
          </button>
        </li>
        <li className="notation__list-item">
          <button
            onClick={() => changeSubdivision("Sixteenth")}
            className={`btn radio-btn ${
              subdivision === "Sixteenth" && "radio-btn--selected"
            }`}
          >
            Sixteenth
          </button>
        </li>
        <li className="notation__list-item">
          <button
            onClick={() => changeSubdivision("Triplet")}
            className={`btn radio-btn ${
              subdivision === "Triplet" && "radio-btn--selected"
            }`}
          >
            Triplet
          </button>
        </li>
      </ul>

      <div className="notation__stress">
        <div className="notation__stress-toggle">
          <h2 className="notation__stress-toggle-text">Stress</h2>
          <div
            onClick={toggleStressing}
            className={`toggle ${isStressing && "toggle--on"}`}
          >
            <div className="toggle--text-off">OFF</div>
            <div className="toggle-btn" />
            <div className="toggle--text-on">ON</div>
          </div>
        </div>

        <div className="notation__stress-control">
          <button onClick={beatDown} className="btn up-btn">
            &ndash;
          </button>
          <h3 className="notation__stress-text">{barLength}</h3>
          <button onClick={beatUp} className="btn down-btn">
            +
          </button>
        </div>

        <div className="notation__stress-frequency">
          <h2 className="notation__stress-frequency-text">
            Stress Frequency: <span>{stressFrequency}</span>
          </h2>
          <div className="notation__stress-frequency-control">
            <button onClick={stressDown} className="btn down-btn">
              &ndash;
            </button>
            <input
              className="slider stress-frequency-slider"
              type="range"
              min={200}
              max={4000}
              step={10}
              ref={rangeRef}
              value={stressFrequency}
              onChange={(e) => slideStressFrequency(parseInt(e.target.value))}
            />
            <button onClick={stressUp} className="btn down-btn">
              +
            </button>
          </div>
        </div>
      </div>

      <div className="divider-container">
        <div className="divider-lines">
          <div className="divider-diamond"></div>
        </div>
      </div>
    </section>
  );
};

export default NotationControl;
