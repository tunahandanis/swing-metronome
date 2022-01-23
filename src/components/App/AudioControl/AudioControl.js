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
    <section>
      <div>
        <h1>Quarter note sound</h1>
        <div>
          <h1>Sound Type</h1>
          <button onClick={() => setQuarterSoundType("Artificial")}>
            Artificial sound
          </button>
          <button onClick={() => setQuarterSoundType("Drum")}>
            Drum sounds
          </button>
        </div>
        {quarterSoundType === "Artificial" ? (
          <div>
            <h2>{quarterFrequency}</h2>

            <input
              type="range"
              min={200}
              max={4000}
              step={10}
              defaultValue={quarterFrequency}
              onChange={(e) => slideQuarterFrequency(parseInt(e.target.value))}
            />
          </div>
        ) : quarterSoundType === "Drum" ? (
          <ul>
            {/*
        ====================================
        MANUALLY TYPING LIST ITEMS
        BECAUSE AUDIO FILE NAMES WON'T MATCH
        ====================================
        */}
            <li
              style={{
                backgroundColor: quarterDrumAudios.snare ? "green" : "red",
              }}
            >
              <button onClick={() => toggleQuarterDrumAudios("snare")}>
                Snare
              </button>
            </li>
            <li
              style={{
                backgroundColor: quarterDrumAudios.hihatClosed
                  ? "green"
                  : "red",
              }}
            >
              <button onClick={() => toggleQuarterDrumAudios("hihatClosed")}>
                Hi-hat Closed
              </button>
            </li>
            <li
              style={{
                backgroundColor: quarterDrumAudios.hihatOpen ? "green" : "red",
              }}
            >
              <button onClick={() => toggleQuarterDrumAudios("hihatOpen")}>
                Hi-hat Open
              </button>
            </li>
            <li
              style={{
                backgroundColor: quarterDrumAudios.bassDrum ? "green" : "red",
              }}
            >
              <button onClick={() => toggleQuarterDrumAudios("bassDrum")}>
                Bass Drum
              </button>
            </li>
            <li
              style={{
                backgroundColor: quarterDrumAudios.sticks ? "green" : "red",
              }}
            >
              <button onClick={() => toggleQuarterDrumAudios("sticks")}>
                Sticks
              </button>
            </li>
          </ul>
        ) : null}
      </div>

      <div>
        <h1>Sub note sound</h1>
        <div>
          <h1>Sound Type</h1>
          <button onClick={() => setSubSoundType("Artificial")}>
            Artificial sound
          </button>
          <button onClick={() => setSubSoundType("Drum")}>Drum sounds</button>
        </div>
        {subSoundType === "Artificial" ? (
          <div>
            <h2>{subFrequency}</h2>
            <input
              type="range"
              min={200}
              max={4000}
              step={10}
              defaultValue={subFrequency}
              onChange={(e) => slideSubFrequency(parseInt(e.target.value))}
            />
          </div>
        ) : subSoundType === "Drum" ? (
          <ul>
            {/*
        ====================================
        MANUALLY TYPING LIST ITEMS
        BECAUSE AUDIO FILE NAMES WON'T MATCH
        ====================================
        */}
            <li
              style={{ backgroundColor: subDrumAudios.snare ? "green" : "red" }}
            >
              <button onClick={() => toggleSubDrumAudios("snare")}>
                Snare
              </button>
            </li>
            <li
              style={{
                backgroundColor: subDrumAudios.hihatClosed ? "green" : "red",
              }}
            >
              <button onClick={() => toggleSubDrumAudios("hihatClosed")}>
                Hi-hat Closed
              </button>
            </li>
            <li
              style={{
                backgroundColor: subDrumAudios.hihatOpen ? "green" : "red",
              }}
            >
              <button onClick={() => toggleSubDrumAudios("hihatOpen")}>
                Hi-hat Open
              </button>
            </li>
            <li
              style={{
                backgroundColor: subDrumAudios.bassDrum ? "green" : "red",
              }}
            >
              <button onClick={() => toggleSubDrumAudios("bassDrum")}>
                Bass Drum
              </button>
            </li>
            <li
              style={{
                backgroundColor: subDrumAudios.sticks ? "green" : "red",
              }}
            >
              <button onClick={() => toggleSubDrumAudios("sticks")}>
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
