import * as actionTypes from './actions';
import noteService from '../../services/notes';

const reducer = (state = [], action) => {
  switch (action.type) {
    case actionTypes.INIT_NOTES:
      return action.payload;
    case actionTypes.ADD_TODO:
      return {
        notes: [
          {
            id: new Date().valueOf(),
            ...action.payload,
            done: false,
          },
        ],
      };
    case actionTypes.REMOVE_TODO:
      const updateArray = state.notes.filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        notes: updateArray,
      };
    case actionTypes.DONE_NOTE:
      const doneToggle = state.notes.map((item) => {
        return item.id === action.payload
          ? { ...item, done: !item.done }
          : { ...item };
      });
      return {
        ...state,
        notes: doneToggle,
      };
    default:
      return state;
  }
};

export const initNotes = () => {
  return async (dispatch) => {
    const notes = await noteService.getAll();
    dispatch({
      type: actionTypes.INIT_NOTES,
      payload: notes,
    });
  };
};

export default reducer;
