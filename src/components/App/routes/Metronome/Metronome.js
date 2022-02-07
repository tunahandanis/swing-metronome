import React from "react";
import MetronomeInterface from "./MetronomeInterface/MetronomeInterface";
import NotationControl from "./NotationControl/NotationControl";
import AudioControl from "./AudioControl/AudioControl";
import Header from "./Header/Header";
import { MetronomeProvider } from "../../../../context/context";

const Metronome = () => {
  return (
    <main>
      <MetronomeProvider>
        <Header />
        <MetronomeInterface />
        <NotationControl />
        <AudioControl />
      </MetronomeProvider>
    </main>
  );
};

export default Metronome;
