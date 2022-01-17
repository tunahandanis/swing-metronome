import React, { useState, useEffect, useRef, useContext } from "react";

const MetronomeContext = React.createContext();

const MetronomeProvider = ({ children }) => {
  return <MetronomeContext.Provider>{children}</MetronomeContext.Provider>;
};

export { MetronomeProvider };
