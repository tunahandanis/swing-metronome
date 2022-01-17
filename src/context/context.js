import React, { useState, useEffect, useRef, useContext } from "react";
import {
  scheduleAheadTime,
  lookahead,
  noteLength,
  currentSubLength,
} from "../config/metronomeConfig";

const MetronomeContext = React.createContext();

const MetronomeProvider = ({ children }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [tempo, setTempo] = useState(60);
  const [subdivision, setSubdivision] = useState("Quarter");
  const [barLength, setBarLength] = useState(2);
  const [isStressing, setIsStressing] = useState(false);

  const intervalRef = useRef();
  const audioContext = useRef(null);
  const tempoRef = useRef(tempo);

  let timeBetweenBeats;
  let currentSubNote = 0;
  let currentQuarterNote = 0;
  let nextNoteTime = 0.0;

  return <MetronomeContext.Provider>{children}</MetronomeContext.Provider>;
};

const useMetronomeContext = () => {
  return useContext(MetronomeContext);
};

export { MetronomeProvider, useMetronomeContext };
