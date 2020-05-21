import {
  ADD_TOP_APP,
  ADD_TOP_APPS
} from '../actions/topApps.action';

const topApps = (state = [], action) => {
  switch (action.type) {
    case ADD_TOP_APP:
      return [
        ...state,
        action.topApp
      ];

    case ADD_TOP_APPS:
      return [
        ...state,
        ...action.topApps
      ];

    default:
      return state;
  }
}

export default topApps;