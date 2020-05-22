import { combineReducers } from 'redux';

import recommandApps from './recommandApps.reducer';
import topApps from './topApps.reducer';
import search from './search.reducer';

export default combineReducers({
  recommandApps,
  topApps,
  search
});