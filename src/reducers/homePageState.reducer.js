import {
  SET_TOP_APPS_STATE,
  SET_SCROLL_TOP,
  SET_SEARCH_STATE
} from '../actions/homePageState.action';

const initialState = {
  topAppsState: {
    isLoading: false,
    hasMore: false,
    limit: 0
  },
  searchState: {
    text: '',
    isActive: false,
    isLoading: false,
    results: [],
    showEmpty: false
  },
  scrollTop: 0
}

const homePageState = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOP_APPS_STATE:
      return {
        ...state,
        topAppsState: action.topAppsState
      };

    case SET_SCROLL_TOP:
      return {
        ...state,
        scrollTop: action.scrollTop
      };

    case SET_SEARCH_STATE:
      return {
        ...state,
        searchState: action.searchState
      };

    default:
      return state;
  }
}

export default homePageState;