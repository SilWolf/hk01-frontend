import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { addRecommandApps } from './actions/recommandApps.action';
import { addTopApps } from './actions/topApps.action';

import store from './store';
import Model_ItuneApp from './models/ItuneApp.model';

import './App.css';

import {
  Searchbar,
  RecommandApp,
  TopApp
} from './components';
import axios from 'axios';

function App() {
  const recommandApps = useSelector(state => state.recommandApps);
  const topApps = useSelector(state => state.topApps);

  useEffect(() => { // onComponentMount
    // Get list of top apps and store it
    axios.get('https://itunes.apple.com/hk/rss/topgrossingapplications/limit=10/json').then((response) => {
      let entries = response.data.feed.entry;
      let recommandApps = entries.map((json) => {
        return new Model_ItuneApp().fromJson(json);
      });
      store.dispatch(addRecommandApps(recommandApps));
    });

    // Get list of top app and store it
    axios.get('https://itunes.apple.com/hk/rss/topfreeapplications/limit=10/json').then((response) => {
      let entries = response.data.feed.entry;
      let topApps = entries.map((json) => {
        return new Model_ItuneApp().fromJson(json);
      });
      store.dispatch(addTopApps(topApps));
    });
  }, []);

  return (
    <div className="App">
      <Searchbar></Searchbar>
      <div>
        {
          recommandApps.map((recommandApp, index) => 
            <RecommandApp
              key={index}
              index={index+1}
              title={recommandApp.name}
              caption={recommandApp.category}
              image={recommandApp.image.url}
            ></RecommandApp>
          )
        }
      </div>
      <div>
        {
          topApps.map((topApp, index) => 
            <TopApp
              key={index}
              index={index+1}
              title={topApp.name}
              caption={topApp.category}
              image={topApp.image.url}
            ></TopApp>
          )
        }
      </div>
    </div>
  );
}

export default App;
