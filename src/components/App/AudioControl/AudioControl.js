import React from "react";
import { useMetronomeContext } from "../../../context/context";

const AudioControl = () => {
  const { quarterAudios, subAudios, toggleQuarterAudios, toggleSubAudios } =
    useMetronomeContext();

  const drumAudios = [
    "Snare",
    "Hi-hat Open",
    "Hi-hat Closed",
    "Bass Drum",
    "Sticks",
  ];
  return (
    <section>
      <div>
        <h1>Quarter note sound</h1>
        <ul>
          {/*
        ====================================
        MANUALLY TYPING LIST ITEMS
        BECAUSE AUDIO FILE NAMES WON'T MATCH
        ====================================
        */}
          <li
            style={{ backgroundColor: quarterAudios.snare ? "green" : "red" }}
          >
            <button onClick={() => toggleQuarterAudios("snare")}>Snare</button>
          </li>
          <li
            style={{
              backgroundColor: quarterAudios.hihatClosed ? "green" : "red",
            }}
          >
            <button onClick={() => toggleQuarterAudios("hihatClosed")}>
              Hi-hat Closed
            </button>
          </li>
          <li
            style={{
              backgroundColor: quarterAudios.hihatOpen ? "green" : "red",
            }}
          >
            <button onClick={() => toggleQuarterAudios("hihatOpen")}>
              Hi-hat Open
            </button>
          </li>
          <li
            style={{
              backgroundColor: quarterAudios.bassDrum ? "green" : "red",
            }}
          >
            <button onClick={() => toggleQuarterAudios("bassDrum")}>
              Bass Drum
            </button>
          </li>
          <li
            style={{ backgroundColor: quarterAudios.sticks ? "green" : "red" }}
          >
            <button onClick={() => toggleQuarterAudios("sticks")}>
              Sticks
            </button>
          </li>
        </ul>
      </div>

      <div>
        <h1>Sub note sound</h1>
        <ul>
          {/*
        ====================================
        MANUALLY TYPING LIST ITEMS
        BECAUSE AUDIO FILE NAMES WON'T MATCH
        ====================================
        */}
          <li style={{ backgroundColor: subAudios.snare ? "green" : "red" }}>
            <button onClick={() => toggleSubAudios("snare")}>Snare</button>
          </li>
          <li
            style={{ backgroundColor: subAudios.hihatClosed ? "green" : "red" }}
          >
            <button onClick={() => toggleSubAudios("hihatClosed")}>
              Hi-hat Closed
            </button>
          </li>
          <li
            style={{ backgroundColor: subAudios.hihatOpen ? "green" : "red" }}
          >
            <button onClick={() => toggleSubAudios("hihatOpen")}>
              Hi-hat Open
            </button>
          </li>
          <li style={{ backgroundColor: subAudios.bassDrum ? "green" : "red" }}>
            <button onClick={() => toggleSubAudios("bassDrum")}>
              Bass Drum
            </button>
          </li>
          <li style={{ backgroundColor: subAudios.sticks ? "green" : "red" }}>
            <button onClick={() => toggleSubAudios("sticks")}>Sticks</button>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default AudioControl;
