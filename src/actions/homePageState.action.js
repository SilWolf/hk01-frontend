export const SET_TOP_APPS_STATE = 'SET_TOP_APPS_STATE';
export const SET_TOP_APPS_SCROLL_TOP = 'SET_TOP_APPS_SCROLL_TOP';
export const SET_SCROLL_TOP = 'SET_SCROLL_TOP';
export const SET_SEARCH_STATE = 'SET_SEARCH_STATE';

export function setTopAppsState(topAppsState) {
  return {
    type: SET_TOP_APPS_STATE,
    topAppsState: topAppsState
  }
}

export function setSearchState(searchState) {
  return {
    type: SET_SEARCH_STATE,
    searchState: searchState
  }
}

export function setScrollTop(scrollTop) {
  return {
    type: SET_SCROLL_TOP,
    scrollTop: scrollTop
  }
}