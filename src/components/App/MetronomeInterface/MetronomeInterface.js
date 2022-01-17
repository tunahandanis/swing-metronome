import React, { useRef } from "react";
import { useMetronomeContext } from "../../../context/context";

const MetronomeInterface = () => {
  const { tempo, setTempo, isRunning, startStop } = useMetronomeContext();

  // Range ref hook

  const rangeRef = useRef();

  // Functions for increasing/decreasing bpm by buttons

  const stepUp = () => {
    if (tempo < rangeRef.current.max) setTempo((prev) => prev + 1);
  };

  const stepDown = () => {
    if (tempo > rangeRef.current.min) setTempo((prev) => prev - 1);
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
          onChange={(e) => setTempo(parseInt(e.target.value))}
        />
        <button onClick={stepUp}>+</button>
      </div>
      <button onClick={startStop}>Start/Stop</button>
    </section>
  );
};

export default MetronomeInterface;
