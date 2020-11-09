import {
  RESET_UI,
  SET_ERROR,
  SET_LOADING,
  UNSET_ERROR,
  UNSET_LOADING,
} from '../actions/uiAction';

const initialState = {
  isLoading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, isLoading: true, error: null };
    case UNSET_LOADING:
      return { ...state, isLoading: false };
    case SET_ERROR:
      return { ...state, error: action.error, isLoading: false };
    case UNSET_ERROR:
      return { ...state, error: null };
    case RESET_UI:
      return initialState;
    default:
      return state;
  }
};
