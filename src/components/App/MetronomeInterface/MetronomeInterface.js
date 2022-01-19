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
    <section>
      <h1>
        <span>{tempo}</span>BPM
      </h1>
      <div>
        <button onClick={stepDown}>&ndash;</button>
        <input
          ref={rangeRef}
          type="range"
          min={30}
          max={250}
          onChange={(e) => slideTempo(parseInt(e.target.value))}
        />
        <button onClick={stepUp}>+</button>
      </div>
      <div>
        <h1>Swing Percentage: {swingPercentage}%</h1>
        <input
          type="range"
          min={0}
          max={100}
          onChange={(e) => slideSwing(parseInt(e.target.value))}
        />
      </div>
      <button onClick={startStop}>Start/Stop</button>
    </section>
  );
};

export default MetronomeInterface;
