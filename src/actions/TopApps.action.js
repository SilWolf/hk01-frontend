import Model_ItuneApp from '../models/ItuneApp.model';

export const ADD_TOP_APP = 'ADD_TOP_APP';
export const ADD_TOP_APPS = 'ADD_TOP_APPS';

export function addTopApp(topApp) {
  return {
    type: ADD_TOP_APP,
    topApp: topApp
  }
}

export function addTopAppByJson(json) {
  let topApp = new Model_ItuneApp().fromJson(json);
  return addTopApp(topApp);
}

export function addTopApps(topApps) {
  return {
    type: ADD_TOP_APPS,
    topApps: topApps
  }
}