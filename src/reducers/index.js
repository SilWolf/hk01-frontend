import { combineReducers } from 'redux';

import recommandApps from './recommandApps.reducer';
import topApps from './topApps.reducer';
import homePageState from './homePageState.reducer';

export default combineReducers({
  recommandApps,
  topApps,
  homePageState
});