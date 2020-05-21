import { combineReducers } from 'redux';

import recommandApps from './recommandApps.reducer';
import topApps from './topApps.reducer';

export default combineReducers({
  recommandApps,
  topApps
});