import React, { useRef } from "react";
import { useMetronomeContext } from "../../../../../context/context";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

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
    swingActive,
    toggleSwing,
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
      <div className="interface__tempo container">
        <h1 className="interface__tempo-text">
          <span className="interface__tempo-text-span">{tempo}</span>BPM
        </h1>
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
            value={tempo}
            onChange={(e) => slideTempo(parseInt(e.target.value))}
          />
          <button onClick={stepUp} className="btn up-btn">
            +
          </button>
        </div>

        <button onClick={startStop} className="btn start-stop-btn">
          {isRunning ? (
            <PauseIcon sx={{ fontSize: "3.2rem" }} />
          ) : (
            <PlayArrowIcon sx={{ fontSize: "3.5rem" }} />
          )}
        </button>

        {/* DIVS FOR TOGGLE SWING BUTTON STYLE */}

        <div className="interface__swing-toggle">
          <h2 className="interface__swing-toggle-title">Swing</h2>
          <div
            onClick={toggleSwing}
            className={`toggle ${swingActive && "toggle--on"}`}
          >
            <div className="toggle--text-off">OFF</div>
            <div className="toggle-btn" />
            <div className="toggle--text-on">ON</div>
          </div>
        </div>
      </div>

      {swingActive && (
        <div className="interface__swing container">
          <h1 className="interface__swing-text">
            Swing Percentage:{" "}
            <span className="interface__swing-text-span">
              {swingPercentage}%
            </span>
          </h1>
          <input
            className="slider swing-slider"
            type="range"
            min={0}
            max={100}
            onChange={(e) => slideSwing(parseInt(e.target.value))}
          />
        </div>
      )}

      <div className="divider-container">
        <div className="divider-lines">
          <div className="divider-diamond"></div>
        </div>
      </div>
    </section>
  );
};

export default MetronomeInterface;