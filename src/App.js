import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import store from './store';
import Model_ItuneApp from './models/ItuneApp.model';
import { addRecommandApps } from './actions/recommandApps.action';
import { addTopApps } from './actions/topApps.action';

import HomePage from './pages/home';
import DetailPage from './pages/detail';

import axios from 'axios';

function App() {
  // on mount: load data from APIs
  useEffect(() => {
    // Get list of top apps and store it
    axios.get('https://itunes.apple.com/hk/rss/topgrossingapplications/limit=10/json').then((response) => {
      let entries = response.data.feed.entry;
      let recommandApps = entries.map((json) => {
        return new Model_ItuneApp().fromJson(json);
      });
      store.dispatch(addRecommandApps(recommandApps));
    });

    // Get list of top app and store it
    axios.get('https://itunes.apple.com/hk/rss/topfreeapplications/limit=100/json').then((response) => {
      let entries = response.data.feed.entry;
      let topApps = entries.map((json) => {
        return new Model_ItuneApp().fromJson(json);
      });
      store.dispatch(addTopApps(topApps));
    });
  }, []);

  return <Router basename={'/hk01-codetest/frontend'}>
    <Switch>
      <Route path="/detail/:id">
        <DetailPage />
      </Route>
      <Route path="/">
        <HomePage />
      </Route>
    </Switch>
  </Router>
}

export default App;
