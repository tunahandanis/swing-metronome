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
        <h1 className="audio__control-title">Quarter Note</h1>
        <div className="audio__control-switch">
          <button
            className={`btn radio-btn ${
              quarterSoundType === "Artificial" && "radio-btn--selected"
            }`}
            onClick={() => {
              {
                /* CALLBACK FUNCTION TO PREVENT UNNECESSARY RE-RENDER */
              }
              if (quarterSoundType !== "Artificial")
                setQuarterSoundType("Artificial");
            }}
          >
            Artificial
          </button>
          <button
            className={`btn radio-btn ${
              quarterSoundType === "Drum" && "radio-btn--selected"
            }`}
            onClick={() => {
              {
                /* CALLBACK FUNCTION TO PREVENT UNNECESSARY RE-RENDER */
              }
              if (quarterSoundType !== "Drum") setQuarterSoundType("Drum");
            }}
          >
            Drum
          </button>
        </div>
        {quarterSoundType === "Artificial" ? (
          <div className="audio__artificial">
            <h2 className="audio__artificial-frequency-text">
              Frequency: <span>{quarterFrequency}</span>
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
              onClick={() => toggleQuarterDrumAudios("snare")}
              className={`audio__drum-item ${
                quarterDrumAudios.snare && "audio__drum-item--selected"
              }`}
            >
              <button className="btn drum-btn">Snare</button>
            </li>
            <li
              onClick={() => toggleQuarterDrumAudios("hihatClosed")}
              className={`audio__drum-item ${
                quarterDrumAudios.hihatClosed && "audio__drum-item--selected"
              }`}
            >
              <button className="btn drum-btn">Hi-hat Closed</button>
            </li>
            <li
              onClick={() => toggleQuarterDrumAudios("hihatOpen")}
              className={`audio__drum-item ${
                quarterDrumAudios.hihatOpen && "audio__drum-item--selected"
              }`}
            >
              <button className="btn drum-btn">Hi-hat Open</button>
            </li>
            <li
              onClick={() => toggleQuarterDrumAudios("bassDrum")}
              className={`audio__drum-item ${
                quarterDrumAudios.bassDrum && "audio__drum-item--selected"
              }`}
            >
              <button className="btn drum-btn">Bass Drum</button>
            </li>
            <li
              onClick={() => toggleQuarterDrumAudios("sticks")}
              className={`audio__drum-item ${
                quarterDrumAudios.sticks && "audio__drum-item--selected"
              }`}
            >
              <button className="btn drum-btn">Sticks</button>
            </li>
          </ul>
        ) : null}
      </div>

      <div className="audio__control">
        <h1 className="audio__control-title">Sub Note</h1>
        <div className="audio__control-switch">
          <button
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
              onClick={() => toggleSubDrumAudios("snare")}
              className={`audio__drum-item ${
                subDrumAudios.snare && "audio__drum-item--selected"
              }`}
            >
              <button className="btn drum-btn">Snare</button>
            </li>
            <li
              onClick={() => toggleSubDrumAudios("hihatClosed")}
              className={`audio__drum-item ${
                subDrumAudios.hihatClosed && "audio__drum-item--selected"
              }`}
            >
              <button className="btn drum-btn">Hi-hat Closed</button>
            </li>
            <li
              onClick={() => toggleSubDrumAudios("hihatOpen")}
              className={`audio__drum-item ${
                subDrumAudios.hihatOpen && "audio__drum-item--selected"
              }`}
            >
              <button className="btn drum-btn">Hi-hat Open</button>
            </li>
            <li
              onClick={() => toggleSubDrumAudios("bassDrum")}
              className={`audio__drum-item ${
                subDrumAudios.bassDrum && "audio__drum-item--selected"
              }`}
            >
              <button className="btn drum-btn">Bass Drum</button>
            </li>
            <li
              onClick={() => toggleSubDrumAudios("sticks")}
              className={`audio__drum-item ${
                subDrumAudios.sticks && "audio__drum-item--selected"
              }`}
            >
              <button className="btn drum-btn">Sticks</button>
            </li>
          </ul>
        ) : null}
      </div>
    </section>
  );
};

export default AudioControl;
