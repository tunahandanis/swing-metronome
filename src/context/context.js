import React, { useState, useEffect, useRef, useContext } from "react";
import {
  scheduleAheadTime,
  lookahead,
  noteLength,
  currentSubLength,
} from "../config/metronomeConfig";

const MetronomeContext = React.createContext();

const MetronomeProvider = ({ children }) => {
  return <MetronomeContext.Provider>{children}</MetronomeContext.Provider>;
};

export { MetronomeProvider };
