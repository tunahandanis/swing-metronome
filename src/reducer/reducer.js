import ACTIONS from "./actionTypes";

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.START:
      return { ...state, isRunning: true };
    case ACTIONS.STOP:
      return { ...state, isRunning: false };

    case ACTIONS.SLIDE_TEMPO:
      return { ...state, tempo: action.payload.newTempo };
    case ACTIONS.INCREASE_TEMPO:
      return { ...state, tempo: state.tempo + 1 };
    case ACTIONS.DECREASE_TEMPO:
      return { ...state, tempo: state.tempo - 1 };

    case ACTIONS.SLIDE_SWING:
      return { ...state, swingPercentage: action.payload.newSwing };

    case ACTIONS.CHANGE_SUBDIVISION:
      return { ...state, subdivision: action.payload.newSubdivision };

    case ACTIONS.TOGGLE_STRESSING:
      return { ...state, isStressing: !state.isStressing };
    case ACTIONS.INCREASE_BAR_LENGTH:
      return { ...state, barLength: state.barLength + 1 };
    case ACTIONS.DECREASE_BAR_LENGTH:
      return { ...state, barLength: state.barLength - 1 };

    case ACTIONS.TOGGLE_FIRST_DRUM_AUDIOS:
      return {
        ...state,
        firstDrumAudios: {
          ...state.firstDrumAudios,
          [action.payload.toggledAudio]:
            !state.firstDrumAudios[action.payload.toggledAudio],
        },
      };
    case ACTIONS.TOGGLE_SUB_DRUM_AUDIOS:
      return {
        ...state,
        subDrumAudios: {
          ...state.subDrumAudios,
          [action.payload.toggledAudio]:
            !state.subDrumAudios[action.payload.toggledAudio],
        },
      };

    case ACTIONS.SLIDE_FIRST_FREQUENCY:
      return { ...state, firstFrequency: action.payload.newFrequency };
    case ACTIONS.SLIDE_SUB_FREQUENCY:
      return { ...state, subFrequency: action.payload.newFrequency };

    case ACTIONS.SET_FIRST_SOUND_TYPE:
      return { ...state, firstSoundType: action.payload.newSoundType };
    case ACTIONS.SET_SUB_SOUND_TYPE:
      return { ...state, subSoundType: action.payload.newSoundType };

    case ACTIONS.SLIDE_STRESS_FREQUENCY:
      return { ...state, stressFrequency: action.payload.newStressFrequency };

    case ACTIONS.TOGGLE_SWING:
      return { ...state, swingActive: !state.swingActive };

    default:
      return state;
  }
};

export default reducer;
