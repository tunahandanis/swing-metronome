import React from "react";

const MetronomeInterface = () => {
  return (
    <section>
      <h1>
        <span>60</span>BPM
      </h1>
      <div>
        <button>&ndash;</button>
        <input type="range" min={30} max={250} />
        <button>+</button>
      </div>
      <button>Start/Stop</button>
    </section>
  );
};

export default MetronomeInterface;
