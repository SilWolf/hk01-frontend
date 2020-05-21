import {
  ADD_TOP_APP
} from '../actions/TopApps.action';

const TopApps = (state = [], action) => {
  switch (action.type) {
    case ADD_TOP_APP:
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          isVisible: true
        }
      ];

    default:
      return state;
  }
}

export default TopApps;