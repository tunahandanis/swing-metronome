import React from "react";

const AudioControl = () => {
  const drumAudios = [
    "Snare",
    "Hi-hat Closed",
    "Hi-hat Open",
    "Sticks",
    "Bass Drum",
  ];
  return (
    <section>
      <div>
        <h1>Quarter note sound</h1>
        <ul>
          {drumAudios.map((item) => {
            return (
              <li key={"Quarter " + item}>
                <button>{item}</button>
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        <h1>Sub note sound</h1>
        <ul>
          {drumAudios.map((item) => {
            return (
              <li key={"Sub " + item}>
                <button>{item}</button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default AudioControl;
