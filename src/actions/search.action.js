export const SET_SEARCH_TEXT = 'SET_SEARCH_TEXT';
export const SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS';
export const CLEAR_SEARCH = 'CLEAR_SEARCH';

export function setSearchText(text) {
  return {
    type: SET_SEARCH_TEXT,
    text: text
  }
}

export function setSearchResults(results) {
  return {
    type: SET_SEARCH_RESULTS,
    results: results
  }
}

export function clearSearch() {
  return {
    type: CLEAR_SEARCH
  }
}