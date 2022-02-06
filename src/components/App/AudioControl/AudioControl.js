import React from "react";
import { useMetronomeContext } from "../../../context/context";

const AudioControl = () => {
  const {
    quarterDrumAudios,
    subDrumAudios,
    toggleQuarterDrumAudios,
    toggleSubDrumAudios,
    quarterFrequency,
    subFrequency,
    slideQuarterFrequency,
    slideSubFrequency,
    quarterSoundType,
    subSoundType,
    setQuarterSoundType,
    setSubSoundType,
  } = useMetronomeContext();

  return (
    <section className="audio">
      <div className="audio__control">
        <h1 className="audio__control-title">Quarter note sound</h1>
        <div className="audio__control-switch">
          <h1 className="audio__control-switch-title">Sound Type</h1>
          <button
            className="btn audio-switch-btn"
            onClick={() => {
              {
                /* CALLBACK FUNCTION TO PREVENT UNNECESSARY RE-RENDER */
              }
              if (quarterSoundType !== "Artificial")
                setQuarterSoundType("Artificial");
            }}
          >
            Artificial sound
          </button>
          <button
            className="btn audio-switch-btn"
            onClick={() => {
              {
                /* CALLBACK FUNCTION TO PREVENT UNNECESSARY RE-RENDER */
              }
              if (quarterSoundType !== "Drum") setQuarterSoundType("Drum");
            }}
          >
            Drum sounds
          </button>
        </div>
        {quarterSoundType === "Artificial" ? (
          <div className="audio__artificial">
            <h2 className="audio__artificial-frequency-text">
              {quarterFrequency}
            </h2>

            <input
              className="slider type-frequency-slider"
              type="range"
              min={200}
              max={4000}
              step={10}
              defaultValue={quarterFrequency}
              onChange={(e) => slideQuarterFrequency(parseInt(e.target.value))}
            />
          </div>
        ) : quarterSoundType === "Drum" ? (
          <ul className="audio__drum">
            {/*
        ====================================
        MANUALLY TYPING LIST ITEMS
        BECAUSE AUDIO FILE NAMES WON'T MATCH
        ====================================
        */}
            <li
              className="audio__drum-item"
              style={{
                backgroundColor: quarterDrumAudios.snare ? "green" : "red",
              }}
            >
              <button
                onClick={() => toggleQuarterDrumAudios("snare")}
                className="btn drum-btn"
              >
                Snare
              </button>
            </li>
            <li
              className="audio__drum-item"
              style={{
                backgroundColor: quarterDrumAudios.hihatClosed
                  ? "green"
                  : "red",
              }}
            >
              <button
                onClick={() => toggleQuarterDrumAudios("hihatClosed")}
                className="btn drum-btn"
              >
                Hi-hat Closed
              </button>
            </li>
            <li
              className="audio__drum-item"
              style={{
                backgroundColor: quarterDrumAudios.hihatOpen ? "green" : "red",
              }}
            >
              <button
                onClick={() => toggleQuarterDrumAudios("hihatOpen")}
                className="btn drum-btn"
              >
                Hi-hat Open
              </button>
            </li>
            <li
              className="audio__drum-item"
              style={{
                backgroundColor: quarterDrumAudios.bassDrum ? "green" : "red",
              }}
            >
              <button
                onClick={() => toggleQuarterDrumAudios("bassDrum")}
                className="btn drum-btn"
              >
                Bass Drum
              </button>
            </li>
            <li
              className="audio__drum-item"
              style={{
                backgroundColor: quarterDrumAudios.sticks ? "green" : "red",
              }}
            >
              <button
                onClick={() => toggleQuarterDrumAudios("sticks")}
                className="btn drum-btn"
              >
                Sticks
              </button>
            </li>
          </ul>
        ) : null}
      </div>

      <div className="audio__control">
        <h1 className="audio__control-title">Sub note sound</h1>
        <div className="audio__control-switch">
          <h1 className="audio__control-switch-title">Sound Type</h1>
          <button
            className="btn audio-switch-btn"
            onClick={() => {
              {
                /* CALLBACK FUNCTION TO PREVENT UNNECESSARY RE-RENDER */
              }
              if (subSoundType !== "Artificial") setSubSoundType("Artificial");
            }}
          >
            Artificial sound
          </button>
          <button
            className="btn audio-switch-btn"
            onClick={() => {
              {
                /* CALLBACK FUNCTION TO PREVENT UNNECESSARY RE-RENDER */
              }
              if (subSoundType !== "Drum") setSubSoundType("Drum");
            }}
          >
            Drum sounds
          </button>
        </div>
        {subSoundType === "Artificial" ? (
          <div className="audio__artificial">
            <h2 className="audio__artificial-frequency-text">{subFrequency}</h2>
            <input
              className="slider type-frequency-slider"
              type="range"
              min={200}
              max={4000}
              step={10}
              defaultValue={subFrequency}
              onChange={(e) => slideSubFrequency(parseInt(e.target.value))}
            />
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
              className="audio__drum-item"
              style={{ backgroundColor: subDrumAudios.snare ? "green" : "red" }}
            >
              <button
                onClick={() => toggleSubDrumAudios("snare")}
                className="btn drum-btn"
              >
                Snare
              </button>
            </li>
            <li
              className="audio__drum-item"
              style={{
                backgroundColor: subDrumAudios.hihatClosed ? "green" : "red",
              }}
            >
              <button
                onClick={() => toggleSubDrumAudios("hihatClosed")}
                className="btn drum-btn"
              >
                Hi-hat Closed
              </button>
            </li>
            <li
              className="audio__drum-item"
              style={{
                backgroundColor: subDrumAudios.hihatOpen ? "green" : "red",
              }}
            >
              <button
                onClick={() => toggleSubDrumAudios("hihatOpen")}
                className="btn drum-btn"
              >
                Hi-hat Open
              </button>
            </li>
            <li
              className="audio__drum-item"
              style={{
                backgroundColor: subDrumAudios.bassDrum ? "green" : "red",
              }}
            >
              <button
                onClick={() => toggleSubDrumAudios("bassDrum")}
                className="btn drum-btn"
              >
                Bass Drum
              </button>
            </li>
            <li
              className="audio__drum-item"
              style={{
                backgroundColor: subDrumAudios.sticks ? "green" : "red",
              }}
            >
              <button
                onClick={() => toggleSubDrumAudios("sticks")}
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
