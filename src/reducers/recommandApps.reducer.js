import {
  ADD_RECOMMAND_APP,
  ADD_RECOMMAND_APPS
} from '../actions/recommandApps.action';

const recommandApps = (state = [], action) => {
  switch (action.type) {
    case ADD_RECOMMAND_APP:
      return [
        ...state,
        action.recommandApp
      ];

    case ADD_RECOMMAND_APPS:
      return [
        ...state,
        ...action.recommandApps
      ];

    default:
      return state;
  }
}

export default recommandApps;