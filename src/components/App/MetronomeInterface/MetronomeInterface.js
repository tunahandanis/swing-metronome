import React, { useRef } from "react";
import { useMetronomeContext } from "../../../context/context";

const MetronomeInterface = () => {
  const {
    tempo,
    increaseTempo,
    decreaseTempo,
    slideTempo,
    swingPercentage,
    slideSwing,
    isRunning,
    startStop,
  } = useMetronomeContext();

  // Range ref hook

  const rangeRef = useRef();

  // Functions for increasing/decreasing bpm by buttons

  const stepUp = () => {
    if (tempo < rangeRef.current.max) increaseTempo();
  };

  const stepDown = () => {
    if (tempo > rangeRef.current.min) decreaseTempo();
  };

  return (
    <section className="interface">
      <h1 className="interface__tempo-text">{tempo}BPM</h1>
      <div className="interface__tempo-control">
        <button onClick={stepDown} className="btn down-btn">
          &ndash;
        </button>
        <input
          className="slider tempo-slider"
          ref={rangeRef}
          type="range"
          min={30}
          max={250}
          onChange={(e) => slideTempo(parseInt(e.target.value))}
        />
        <button onClick={stepUp} className="btn up-btn">
          +
        </button>
      </div>
      <div className="interface__swing">
        <h1 className="interface__swing-text">
          Swing Percentage: {swingPercentage}%
        </h1>
        <input
          className="slider swing-slider"
          type="range"
          min={0}
          max={100}
          onChange={(e) => slideSwing(parseInt(e.target.value))}
        />
      </div>
      <button onClick={startStop} className="btn start-stop-btn">
        Start/Stop
      </button>
    </section>
  );
};

export default MetronomeInterface;
