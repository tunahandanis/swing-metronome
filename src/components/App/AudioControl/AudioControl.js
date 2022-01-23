import React from "react";
import { useMetronomeContext } from "../../../context/context";

const AudioControl = () => {
  const {
    quarterDrumAudios,
    subDrumAudios,
    toggleQuarterDrumAudios,
    toggleSubDrumAudios,
  } = useMetronomeContext();

  return (
    <section>
      <div>
        <h1>Quarter note sound</h1>
        <div>
          <h1>Sound Type</h1>
          <button>Artificial sound</button>
          <button>Drum sounds</button>
        </div>
        <div>
          <input type="range" min={200} max={4000} step={10} />
        </div>
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
              backgroundColor: quarterDrumAudios.hihatClosed ? "green" : "red",
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
      </div>

      <div>
        <h1>Sub note sound</h1>
        <div>
          <h1>Sound Type</h1>
          <button>Artificial sound</button>
          <button>Drum sounds</button>
        </div>
        <div>
          <input type="range" min={200} max={4000} step={10} />
        </div>
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
            <button onClick={() => toggleSubDrumAudios("snare")}>Snare</button>
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
            style={{ backgroundColor: subDrumAudios.sticks ? "green" : "red" }}
          >
            <button onClick={() => toggleSubDrumAudios("sticks")}>
              Sticks
            </button>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default AudioControl;
