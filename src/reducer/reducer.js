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

    case ACTIONS.TOGGLE_QUARTER_DRUM_AUDIOS:
      return {
        ...state,
        quarterDrumAudios: {
          ...state.quarterDrumAudios,
          [action.payload.toggledAudio]:
            !state.quarterDrumAudios[action.payload.toggledAudio],
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

    default:
      return state;
  }
};

export default reducer;
