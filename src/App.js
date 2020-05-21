import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { addTopApps } from './actions/topApps.action';

import store from './store';
import Model_ItuneApp from './models/ItuneApp.model';

import './App.css';

import {
  Searchbar,
  RecommandedApp,
  TopApp
} from './components';
import axios from 'axios';

function App() {
  const topApps = useSelector(state => state.topApps);

  useEffect(() => { // onComponentMount
    // Get list of top app and store
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
        <RecommandedApp></RecommandedApp>
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
