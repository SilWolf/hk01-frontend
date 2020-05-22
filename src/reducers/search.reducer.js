import {
  SET_SEARCH_TEXT,
  SET_SEARCH_RESULTS,
  CLEAR_SEARCH
} from '../actions/search.action';

const search = (state = { text: null, results: null }, action) => {
  switch (action.type) {
    case SET_SEARCH_TEXT:
      return {
        ...state,
        text: action.text
      }

    case SET_SEARCH_RESULTS:
      return {
        ...state,
        results: action.results
      }

    case CLEAR_SEARCH:
      return {
        ...state,
        text: null,
        results: null
      }

    default:
      return state;
  }
}

export default search;