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
import hihatOpenFile from "../assets/audio/hihat open.mp3";
import sticksFile from "../assets/audio/sticks.mp3";
import bassDrumFile from "../assets/audio/bass drum.mp3";
import silence from "../assets/audio/silence.mp3";

import { AudioContext } from "standardized-audio-context";

const MetronomeContext = React.createContext();

// INITIAL STATE FOR REDUCER

const initialState = {
  isRunning: false,
  tempo: 60,
  swingPercentage: 66,
  subdivision: "First",
  barLength: 2,
  isStressing: false,
  firstDrumAudios: {
    snare: true,
    hihatOpen: false,
    hihatClosed: false,
    bassDrum: false,
    sticks: false,
  },
  subDrumAudios: {
    snare: false,
    hihatOpen: false,
    hihatClosed: false,
    bassDrum: false,
    sticks: true,
  },
  firstFrequency: 800,
  subFrequency: 600,
  firstSoundType: "Drum",
  subSoundType: "Drum",
  stressFrequency: 1500,
  swingActive: false,
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
    firstDrumAudios,
    subDrumAudios,
    firstFrequency,
    subFrequency,
    firstSoundType,
    subSoundType,
    stressFrequency,
    swingActive,
  } = state;

  /*
  =========
  REF HOOKS
  =========
  */

  const intervalRef = useRef();
  const audioContext = useRef(null);

  // These are for avoiding metronome reset after tempo, frequency or swing changes for smoother transitions
  const tempoRef = useRef(tempo);
  const swingRef = useRef(swingPercentage);
  const firstFrequencyRef = useRef(firstFrequency);
  const subFrequencyRef = useRef(subFrequency);
  const stressFrequencyRef = useRef(stressFrequency);

  // Audio file references

  const audioFilesRef = useRef({});

  /*
  ============
  EFFECT HOOKS
  ============
  */

  // Stop metronome when user routes to guide
  useEffect(() => {
    return () => stop();
  }, []);

  useEffect(() => {
    // Resetting metronome after specified changes to adjust new notes
    if (isRunning) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(scheduler, lookahead);
    }
  }, [
    subdivision,
    barLength,
    isStressing,
    firstDrumAudios,
    subDrumAudios,
    firstSoundType,
    subSoundType,
    swingActive,
  ]);

  useEffect(() => {
    // Keeping tempo and swing percentage global for affecting inside functions
    tempoRef.current = tempo;
    swingRef.current = swingPercentage;
    firstFrequencyRef.current = firstFrequency;
    subFrequencyRef.current = subFrequency;
    stressFrequencyRef.current = stressFrequency;
  }, [tempo, swingPercentage, firstFrequency, subFrequency, stressFrequency]);

  /*
  ==========================
  GLOBAL/TEMPORARY VARIABLES
  ==========================
  */

  // These can reset between re-renders, no problem

  let timeBetweenBeats;

  // These are for adjusting subdivision notes, stressed notes and swing notes, counting the queue
  let currentSubNote = 0;
  let currentFirstNote = 0;
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

  // CHANGE DRUM AUDIOS

  const toggleFirstDrumAudios = (e) => {
    // IF STATEMENTS PREVENTS ALL FIRST DRUM SOUNDS BEING FALSE
    if (
      Object.values(firstDrumAudios).reduce(
        (prev, curr) => (curr ? prev + 1 : prev),
        0
      ) > 1 ||
      !firstDrumAudios[e]
    ) {
      dispatch({
        type: ACTIONS.TOGGLE_FIRST_DRUM_AUDIOS,
        payload: { toggledAudio: e },
      });
    }
  };

  const toggleSubDrumAudios = (e) => {
    // IF STATEMENTS PREVENTS ALL SUB DRUM SOUNDS BEING FALSE
    if (
      Object.values(subDrumAudios).reduce(
        (prev, curr) => (curr ? prev + 1 : prev),
        0
      ) > 1 ||
      !subDrumAudios[e]
    ) {
      dispatch({
        type: ACTIONS.TOGGLE_SUB_DRUM_AUDIOS,
        payload: { toggledAudio: e },
      });
    }
  };

  // CHANGE ARTIFICIAL SOUND FREQUENCIES

  const slideFirstFrequency = (e) => {
    dispatch({
      type: ACTIONS.SLIDE_FIRST_FREQUENCY,
      payload: { newFrequency: e },
    });
  };

  const slideSubFrequency = (e) => {
    dispatch({
      type: ACTIONS.SLIDE_SUB_FREQUENCY,
      payload: { newFrequency: e },
    });
  };

  // SET SOUND TYPES

  const setFirstSoundType = (e) => {
    dispatch({
      type: ACTIONS.SET_FIRST_SOUND_TYPE,
      payload: { newSoundType: e },
    });
  };

  const setSubSoundType = (e) => {
    dispatch({
      type: ACTIONS.SET_SUB_SOUND_TYPE,
      payload: { newSoundType: e },
    });
  };

  // SLIDE STRESS FREQUENCY

  const slideStressFrequency = (e) => {
    dispatch({
      type: ACTIONS.SLIDE_STRESS_FREQUENCY,
      payload: { newStressFrequency: e },
    });
  };

  // TOGGLE SWING

  const toggleSwing = () => {
    dispatch({
      type: ACTIONS.TOGGLE_SWING,
    });
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

    // Creating audio context, playing dummy sound for iOS and fetching/processing audio files
    if (audioContext.current === null) {
      let audio = new Audio(silence);
      audio.play();

      audioContext.current = new AudioContext();

      const audioFiles = {
        snare: snareFile,
        hihatClosed: hihatClosedFile,
        hihatOpen: hihatOpenFile,
        sticks: sticksFile,
        bassDrum: bassDrumFile,
      };

      for (let audioName in audioFiles) {
        processAudio(audioName, audioFiles[audioName]);
      }
    }

    turnOn();

    // Resetting the beat number in bar
    currentFirstNote = 0;
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
    const stressing =
      isStressing && currentSubNote === 0 && currentFirstNote === 0;

    // CHECK IF THE NEXT NOTE WILL BE STRESSED
    if (stressing) {
      const osc = audioContext.current.createOscillator();
      osc.frequency.value = stressFrequencyRef.current;
      osc.connect(audioContext.current.destination);
      osc.start(time);
      osc.stop(time + 0.025);
    } else {
      // CHECK IF THE NEXT NOTE WILL BE SUB OR FIRST
      if (currentSubNote === 0) {
        // CHECK IF THE NEXT FIRST NOTE WILL BE ARTIFICIAL OR DRUM SOUND
        if (firstSoundType === "Artificial") {
          const osc = audioContext.current.createOscillator();

          osc.frequency.value = firstFrequencyRef.current;

          osc.connect(audioContext.current.destination);

          osc.start(time);
          osc.stop(time + 0.025);
        } else if (firstSoundType === "Drum") {
          for (let audio in firstDrumAudios) {
            if (firstDrumAudios[audio]) {
              const source = audioContext.current.createBufferSource();

              source.buffer = audioFilesRef.current[audio];

              source.connect(audioContext.current.destination);

              source.start(time);
              source.stop(time + 0.35);
            }
          }
        }
      } else {
        // CHECK IF THE NEXT SUB NOTE WILL BE ARTIFICIAL OR DRUM SOUND
        if (subSoundType === "Artificial") {
          const osc = audioContext.current.createOscillator();

          osc.frequency.value = subFrequencyRef.current;

          osc.connect(audioContext.current.destination);

          osc.start(time);
          osc.stop(time + 0.025);
        } else if (subSoundType === "Drum") {
          for (let audio in subDrumAudios) {
            if (subDrumAudios[audio]) {
              const source = audioContext.current.createBufferSource();

              source.buffer = audioFilesRef.current[audio];

              source.connect(audioContext.current.destination);

              source.start(time);
              source.stop(time + 0.35);
            }
          }
        }
      }
    }
  };

  const nextNote = () => {
    // Adjusting time between two beats according to tempo, swing and sub-division
    timeBetweenBeats = 60.0 / tempoRef.current / currentSubLength(subdivision);

    if (currentSwingNote === 0 && swingActive) {
      nextNoteTime += timeBetweenBeats * ((swingRef.current * 2) / 100);
    } else if (currentSwingNote === 1 && swingActive) {
      nextNoteTime += timeBetweenBeats * (((100 - swingRef.current) * 2) / 100);
    } else {
      nextNoteTime += timeBetweenBeats;
    }

    console.log(nextNoteTime);

    // Counting for sub-notes and stressing
    currentFirstNote++;
    currentSubNote++;
    currentSwingNote++;

    // Checking reset for sub-notes, swing and stressing
    if (currentFirstNote === barLength * currentSubLength(subdivision))
      currentFirstNote = 0;
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
        firstDrumAudios,
        subDrumAudios,
        toggleFirstDrumAudios,
        toggleSubDrumAudios,
        firstFrequency,
        subFrequency,
        slideFirstFrequency,
        slideSubFrequency,
        firstSoundType,
        subSoundType,
        setFirstSoundType,
        setSubSoundType,
        stressFrequency,
        slideStressFrequency,
        swingActive,
        toggleSwing,
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
