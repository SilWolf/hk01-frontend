import Model_ItuneApp from '../models/ItuneApp.model';

export const ADD_RECOMMAND_APP = 'ADD_RECOMMAND_APP';
export const ADD_RECOMMAND_APPS = 'ADD_RECOMMAND_APPS';

export function addRecommandApp(recommandApp) {
  return {
    type: ADD_RECOMMAND_APP,
    recommandApp: recommandApp
  }
}

export function addRecommandAppByJson(json) {
  let recommandApp = new Model_ItuneApp().fromJson(json);
  return addRecommandApp(recommandApp);
}

export function addRecommandApps(recommandApps) {
  return {
    type: ADD_RECOMMAND_APPS,
    recommandApps: recommandApps
  }
}