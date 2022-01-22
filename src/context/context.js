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

import snareFile from "../assets/audio/snare.mp3";
import hihatClosedFile from "../assets/audio/hihat closed.mp3";

const MetronomeContext = React.createContext();

// INITIAL STATE FOR REDUCER

const initialState = {
  isRunning: false,
  tempo: 60,
  swingPercentage: 50,
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

  const {
    isRunning,
    tempo,
    subdivision,
    barLength,
    isStressing,
    swingPercentage,
  } = state;

  /*
  =========
  REF HOOKS
  =========
  */

  const intervalRef = useRef();
  const audioContext = useRef(null);
  const tempoRef = useRef(tempo);

  // Audio file references

  const audioFilesRef = useRef({ snare: null, hihatClosed: null });

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
  }, [subdivision, barLength, isStressing, swingPercentage]);

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

  // These are for adjusting subdivision notes, stressed notes and swing notes, counting the queue
  let currentSubNote = 0;
  let currentQuarterNote = 0;
  let currentSwingNote = 0;

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

  // CHANGE SWING PERCENTAGE

  const slideSwing = (e) => {
    dispatch({ type: ACTIONS.SLIDE_SWING, payload: { newSwing: e } });
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
  ===========
  FETCH AUDIO
  ===========
  */

  const processAudio = async (fileName, file) => {
    const response = await fetch(file);
    const arrayBuffer = await response.arrayBuffer();
    const decodedAudio = await audioContext.current.decodeAudioData(
      arrayBuffer
    );

    audioFilesRef.current[fileName] = decodedAudio;
  };

  /*
  ===============
  METRONOME LOGIC
  ===============
  */

  const start = () => {
    // If it's already running, return
    if (isRunning) return;

    // Creating audio context and fetching/processing audio files
    if (audioContext.current === null) {
      audioContext.current = new AudioContext();

      const audioFiles = { snare: snareFile, hihatClosed: hihatClosedFile };

      for (let audioName in audioFiles) {
        processAudio(audioName, audioFiles[audioName]);
      }
    }

    turnOn();

    // Resetting the beat number in bar
    currentQuarterNote = 0;
    currentSubNote = 0;
    currentSwingNote = 0;

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
    /* // Oscillator for playing the beep
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
    osc.stop(time + noteLength); */

    const source = audioContext.current.createBufferSource();

    source.buffer =
      currentSubNote === 0
        ? audioFilesRef.current.snare
        : audioFilesRef.current.hihatClosed;

    source.connect(audioContext.current.destination);

    source.start(time);
    source.stop(time + 0.35);
  };

  const nextNote = () => {
    // Adjusting time between two beats according to tempo and sub-division
    timeBetweenBeats = 60.0 / tempoRef.current / currentSubLength(subdivision);

    if (currentSwingNote === 0) {
      nextNoteTime += timeBetweenBeats * ((swingPercentage * 2) / 100);
    } else if ((currentSwingNote = 1)) {
      nextNoteTime += timeBetweenBeats * (((100 - swingPercentage) * 2) / 100);
    }

    console.log(nextNoteTime);
    // Adding that to next note's time

    // Counting for sub-notes and stressing
    currentQuarterNote++;
    currentSubNote++;
    currentSwingNote++;

    // Checking reset for sub-notes, swing and stressing
    if (currentQuarterNote === barLength * currentSubLength(subdivision))
      currentQuarterNote = 0;
    if (currentSubNote === currentSubLength(subdivision)) currentSubNote = 0;
    if (currentSwingNote === 2) currentSwingNote = 0;
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
        swingPercentage,
        slideSwing,
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
