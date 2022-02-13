import React, { useRef } from "react";
import { useMetronomeContext } from "../../../../../context/context";

const AudioControl = () => {
  const {
    firstDrumAudios,
    subDrumAudios,
    toggleFirstDrumAudios,
    toggleSubDrumAudios,
    firstFrequency,
    subFrequency,
    slideFirstFrequency,
    slideSubFrequency,
    firstSoundType,
    subSoundType,
    setFirstSoundType,
    setSubSoundType,
  } = useMetronomeContext();

  const firstRangeRef = useRef();
  const subRangeRef = useRef();

  // FREQUENCY CONTROL FUNCTIONS

  const firstUp = () => {
    if (firstFrequency < firstRangeRef.current.max) {
      slideFirstFrequency(
        firstFrequency + parseInt(firstRangeRef.current.step)
      );
    }
  };

  const firstDown = () => {
    if (firstFrequency > firstRangeRef.current.min) {
      slideFirstFrequency(
        firstFrequency - parseInt(firstRangeRef.current.step)
      );
    }
  };

  const subUp = () => {
    if (subFrequency < subRangeRef.current.max) {
      slideSubFrequency(subFrequency + parseInt(subRangeRef.current.step));
    }
  };

  const subDown = () => {
    if (subFrequency > subRangeRef.current.min) {
      slideSubFrequency(subFrequency - parseInt(subRangeRef.current.step));
    }
  };

  return (
    <section className="audio">
      <div className="audio__control">
        <h1 className="audio__control-title">First Note</h1>
        <div className="audio__control-switch">
          <button
            aria-label="set first note to artificial sound"
            className={`btn radio-btn ${
              firstSoundType === "Artificial" && "radio-btn--selected"
            }`}
            onClick={() => {
              {
                /* CALLBACK FUNCTION TO PREVENT UNNECESSARY RE-RENDER */
              }
              if (firstSoundType !== "Artificial")
                setFirstSoundType("Artificial");
            }}
          >
            Artificial
          </button>
          <button
            aria-label="set first note to drum sounds"
            className={`btn radio-btn ${
              firstSoundType === "Drum" && "radio-btn--selected"
            }`}
            onClick={() => {
              {
                /* CALLBACK FUNCTION TO PREVENT UNNECESSARY RE-RENDER */
              }
              if (firstSoundType !== "Drum") setFirstSoundType("Drum");
            }}
          >
            Drum
          </button>
        </div>
        {firstSoundType === "Artificial" ? (
          <div className="audio__artificial">
            <h2 className="audio__artificial-frequency-text">
              Frequency: <span>{firstFrequency}</span>
            </h2>
            <div className="audio__artificial-control">
              <button
                aria-label="decrease first note frequency"
                onClick={firstDown}
                className="btn down-btn"
              >
                &ndash;
              </button>
              <input
                aria-label="control first note frequency"
                className="slider type-frequency-slider"
                type="range"
                min={200}
                max={4000}
                step={10}
                ref={firstRangeRef}
                value={firstFrequency}
                onChange={(e) => slideFirstFrequency(parseInt(e.target.value))}
              />
              <button
                aria-label="increase first note frequency"
                onClick={firstUp}
                className="btn down-btn"
              >
                +
              </button>
            </div>
          </div>
        ) : firstSoundType === "Drum" ? (
          <ul className="audio__drum">
            {/*
        ====================================
        MANUALLY TYPING LIST ITEMS
        BECAUSE AUDIO FILE NAMES WON'T MATCH
        ====================================
        */}
            <li
              onClick={() => toggleFirstDrumAudios("snare")}
              className={`audio__drum-item ${
                firstDrumAudios.snare && "audio__drum-item--selected"
              }`}
            >
              <button
                aria-label="toggle snare sound for first note"
                className="btn drum-btn"
              >
                Snare
              </button>
            </li>
            <li
              onClick={() => toggleFirstDrumAudios("hihatClosed")}
              className={`audio__drum-item ${
                firstDrumAudios.hihatClosed && "audio__drum-item--selected"
              }`}
            >
              <button
                aria-label="toggle hi-hat closed sound for first note"
                className="btn drum-btn"
              >
                Hi-hat Closed
              </button>
            </li>
            <li
              onClick={() => toggleFirstDrumAudios("hihatOpen")}
              className={`audio__drum-item ${
                firstDrumAudios.hihatOpen && "audio__drum-item--selected"
              }`}
            >
              <button
                aria-label="toggle hi-hat open sound for first note"
                className="btn drum-btn"
              >
                Hi-hat Open
              </button>
            </li>
            <li
              onClick={() => toggleFirstDrumAudios("bassDrum")}
              className={`audio__drum-item ${
                firstDrumAudios.bassDrum && "audio__drum-item--selected"
              }`}
            >
              <button
                aria-label="toggle bass drum sound for first note"
                className="btn drum-btn"
              >
                Bass Drum
              </button>
            </li>
            <li
              onClick={() => toggleFirstDrumAudios("sticks")}
              className={`audio__drum-item ${
                firstDrumAudios.sticks && "audio__drum-item--selected"
              }`}
            >
              <button
                aria-label="toggle sticks sound for first note"
                className="btn drum-btn"
              >
                Sticks
              </button>
            </li>
          </ul>
        ) : null}
      </div>

      <div className="audio__control">
        <h1 className="audio__control-title">Sub Note</h1>
        <div className="audio__control-switch">
          <button
            aria-label="set sub note to artificial sound"
            className={`btn radio-btn ${
              subSoundType === "Artificial" && "radio-btn--selected"
            }`}
            onClick={() => {
              {
                /* CALLBACK FUNCTION TO PREVENT UNNECESSARY RE-RENDER */
              }
              if (subSoundType !== "Artificial") setSubSoundType("Artificial");
            }}
          >
            Artificial
          </button>
          <button
            aria-label="set sub note to drum sound"
            className={`btn radio-btn ${
              subSoundType === "Drum" && "radio-btn--selected"
            }`}
            onClick={() => {
              {
                /* CALLBACK FUNCTION TO PREVENT UNNECESSARY RE-RENDER */
              }
              if (subSoundType !== "Drum") setSubSoundType("Drum");
            }}
          >
            Drum
          </button>
        </div>
        {subSoundType === "Artificial" ? (
          <div className="audio__artificial">
            <h2 className="audio__artificial-frequency-text">
              Frequency: <span>{subFrequency}</span>
            </h2>
            <div className="audio__artificial-control">
              <button
                aria-label="decrease sub note frequency"
                onClick={subDown}
                className="btn down-btn"
              >
                &ndash;
              </button>
              <input
                aria-label="control sub note frequency"
                className="slider type-frequency-slider"
                type="range"
                min={200}
                max={4000}
                step={10}
                value={subFrequency}
                ref={subRangeRef}
                onChange={(e) => slideSubFrequency(parseInt(e.target.value))}
              />
              <button
                aria-label="increase sub note frequency"
                onClick={subUp}
                className="btn down-btn"
              >
                +
              </button>
            </div>
          </div>
        ) : subSoundType === "Drum" ? (
          <ul className="audio__drum">
            {/*
        ====================================
        MANUALLY TYPING LIST ITEMS
        BECAUSE AUDIO FILE NAMES WON'T MATCH
        ====================================
        */}
            <li
              onClick={() => toggleSubDrumAudios("snare")}
              className={`audio__drum-item ${
                subDrumAudios.snare && "audio__drum-item--selected"
              }`}
            >
              <button
                aria-label="toggle snare sound for sub note"
                className="btn drum-btn"
              >
                Snare
              </button>
            </li>
            <li
              onClick={() => toggleSubDrumAudios("hihatClosed")}
              className={`audio__drum-item ${
                subDrumAudios.hihatClosed && "audio__drum-item--selected"
              }`}
            >
              <button
                aria-label="toggle hi-hat closed sound for sub note"
                className="btn drum-btn"
              >
                Hi-hat Closed
              </button>
            </li>
            <li
              onClick={() => toggleSubDrumAudios("hihatOpen")}
              className={`audio__drum-item ${
                subDrumAudios.hihatOpen && "audio__drum-item--selected"
              }`}
            >
              <button
                aria-label="toggle hi-hat open sound for sub note"
                className="btn drum-btn"
              >
                Hi-hat Open
              </button>
            </li>
            <li
              onClick={() => toggleSubDrumAudios("bassDrum")}
              className={`audio__drum-item ${
                subDrumAudios.bassDrum && "audio__drum-item--selected"
              }`}
            >
              <button
                aria-label="toggle bass drum sound for sub note"
                className="btn drum-btn"
              >
                Bass Drum
              </button>
            </li>
            <li
              onClick={() => toggleSubDrumAudios("sticks")}
              className={`audio__drum-item ${
                subDrumAudios.sticks && "audio__drum-item--selected"
              }`}
            >
              <button
                aria-label="toggle sticks sound for sub note"
                className="btn drum-btn"
              >
                Sticks
              </button>
            </li>
          </ul>
        ) : null}
      </div>
    </section>
  );
};

export default AudioControl;
