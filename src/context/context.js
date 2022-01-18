import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useReducer,
} from "react";

import reducer from "../reducer/reducer";
import ACTIONS from "../reducer/actionTypes";

import {
  scheduleAheadTime,
  lookahead,
  noteLength,
  currentSubLength,
} from "../config/metronomeConfig";

const MetronomeContext = React.createContext();

// INITIAL STATE FOR REDUCER

const initialState = {
  isRunning: false,
  tempo: 60,
  subdivision: "Quarter",
  barLength: 2,
  isStressing: false,
};

const MetronomeProvider = ({ children }) => {
  /*
  =======
  REDUCER
  =======
  */

  const [state, dispatch] = useReducer(reducer, initialState);

  const { isRunning, tempo, subdivision, barLength, isStressing } = state;

  /*
  =========
  REF HOOKS
  =========
  */

  const intervalRef = useRef();
  const audioContext = useRef(null);
  const tempoRef = useRef(tempo);

  /*
  ============
  EFFECT HOOKS
  ============
  */

  useEffect(() => {
    // Resetting metronome after specified changes to adjust new notes
    if (isRunning) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(scheduler, lookahead);
    }
  }, [subdivision, barLength, isStressing]);

  useEffect(() => {
    // Keeping tempo global for affecting inside functions
    tempoRef.current = tempo;
  }, [tempo]);

  /*
  ==========================
  GLOBAL/TEMPORARY VARIABLES
  ==========================
  */

  // These can reset between re-renders, no problem
  let timeBetweenBeats;

  // These are for adjusting subdivision notes and stressed notes, counting the queue
  let currentSubNote = 0;
  let currentQuarterNote = 0;

  let nextNoteTime = 0.0;

  /*
  ==================
  DISPATCH FUNCTIONS
  ==================
  */

  // TURN ON/OFF

  const turnOn = () => {
    dispatch({ type: ACTIONS.START });
  };

  const turnOff = () => {
    dispatch({ type: ACTIONS.STOP });
  };

  // CHANGE TEMPO

  const increaseTempo = () => {
    dispatch({ type: ACTIONS.INCREASE_TEMPO });
  };

  const decreaseTempo = () => {
    dispatch({ type: ACTIONS.DECREASE_TEMPO });
  };

  const slideTempo = (e) => {
    dispatch({
      type: ACTIONS.SLIDE_TEMPO,
      payload: { newTempo: e },
    });
  };

  // CHANGE SUBDIVISION

  const changeSubdivision = (e) => {
    dispatch({
      type: ACTIONS.CHANGE_SUBDIVISION,
      payload: { newSubdivision: e },
    });
  };

  // CHANGE STRESSING/BAR LENGTH

  const toggleStressing = () => {
    dispatch({ type: ACTIONS.TOGGLE_STRESSING });
  };

  const increaseBarLength = () => {
    dispatch({ type: ACTIONS.INCREASE_BAR_LENGTH });
  };

  const decreaseBarLength = () => {
    dispatch({ type: ACTIONS.DECREASE_BAR_LENGTH });
  };

  /*
  ===============
  METRONOME LOGIC
  ===============
  */

  const start = () => {
    // If it's already running, return
    if (isRunning) return;

    // Creating audio context
    if (audioContext.current === null)
      audioContext.current = new AudioContext();

    turnOn();

    // Resetting the beat number in bar
    currentQuarterNote = 0;

    // Setting the first note's time to present
    nextNoteTime = audioContext.current.currentTime + 0.1;

    // Setting interval for regularly checking if a note is to be scheduled
    intervalRef.current = setInterval(scheduler, lookahead);
  };

  const stop = () => {
    // Stopping the whole system

    turnOff();

    clearInterval(intervalRef.current);
  };

  const startStop = () => {
    // Check to see whether to start or stop
    if (isRunning) stop();
    else start();
  };

  const scheduler = () => {
    // If there are any notes to be played before next interval, schedule them
    while (
      nextNoteTime <
      audioContext.current.currentTime + scheduleAheadTime
    ) {
      // Scheduling and advancing notes
      scheduleNote(nextNoteTime);
      nextNote();
    }
  };

  const scheduleNote = (time) => {
    // Oscillator for playing the beep
    const osc = audioContext.current.createOscillator();

    // For adjusting volume
    const gainNode = audioContext.current.createGain();

    // Checking if beat will be stressed or not
    const stressing =
      isStressing && currentSubNote === 0 && currentQuarterNote === 0;

    // Frequency difference between sub notes and quarter note
    osc.frequency.value = currentSubNote === 0 ? 600 : 400;
    // Frequency difference between stressed and non-stressed quarter notes
    osc.frequency.value = stressing ? 1500 : osc.frequency.value;

    // Connect oscillator to gain node for volume control
    osc.connect(gainNode);

    // If the note is a sub-note, decrease the volume a little
    gainNode.gain.value = currentSubNote === 0 ? 1 : 0.6;

    // Connect whole system to speakers
    gainNode.connect(audioContext.current.destination);

    // Start and stop the beep at specific times
    osc.start(time);
    osc.stop(time + noteLength);
  };

  const nextNote = () => {
    // Adjusting time between two beats according to tempo and sub-division
    timeBetweenBeats = 60.0 / tempoRef.current / currentSubLength(subdivision);

    // Adding that to next note's time
    nextNoteTime += timeBetweenBeats;

    // Counting for sub-notes and stressing
    currentQuarterNote++;
    currentSubNote++;

    // Checking reset for sub-notes and stressing
    if (currentQuarterNote === barLength * currentSubLength(subdivision))
      currentQuarterNote = 0;
    if (currentSubNote === currentSubLength(subdivision)) currentSubNote = 0;
  };

  /*
  ================
  RETURN STATEMENT
  ================
  */

  return (
    <MetronomeContext.Provider
      value={{
        isRunning,
        startStop,
        tempo,
        slideTempo,
        increaseTempo,
        decreaseTempo,
        subdivision,
        changeSubdivision,
        barLength,
        increaseBarLength,
        decreaseBarLength,
        isStressing,
        toggleStressing,
      }}
    >
      {children}
    </MetronomeContext.Provider>
  );
};

const useMetronomeContext = () => {
  return useContext(MetronomeContext);
};

export { MetronomeProvider, useMetronomeContext };
