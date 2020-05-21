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

import styled from 'styled-components';
import axios from 'axios';

const TopToolbar = styled.div`
  padding: 5px 10px;
  background: #F8F8F9;
  box-shadow: 0 2px 2px #E3E4E5
`;

const RecommandAppListHeader = styled.div`
  font-size: 1.5em;
  font-weight: bold;
  padding-left: 10px;
  margin-top: 1em;
`;

const RecommandAppList = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  overflow-x: scroll;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-bottom: 10px;
`;

const RecommandAppWrapper = styled.div`
  flex: 1 0 22vw;
  width: 22vw;
  padding-left: 10px;

  &:last-child {
    padding-right: 10px;
  }
`;

const TopAppList = styled.div`
  margin-left: 10px;
  margin-right: 10px;
`;

const TopAppWrapper = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`;

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
      <TopToolbar>
        <Searchbar></Searchbar>
      </TopToolbar>

      <RecommandAppListHeader>推介</RecommandAppListHeader>
      <RecommandAppList>
        {
          recommandApps.map((recommandApp, index) => 
            <RecommandAppWrapper
              key={index}
            >
              <RecommandApp
                index={index+1}
                title={recommandApp.name}
                caption={recommandApp.category}
                image={recommandApp.image.url}
              ></RecommandApp>
            </RecommandAppWrapper>
          )
        }
      </RecommandAppList>

      <TopAppList>
        {
          topApps.map((topApp, index) => 
            <TopAppWrapper
              key={index}
            >
              <TopApp
                index={index+1}
                title={topApp.name}
                caption={topApp.category}
                image={topApp.image.url}
                variant={ index % 2 === 0 ? 'rounded' : 'circle' }
              ></TopApp>
            </TopAppWrapper>
          )
        }
      </TopAppList>
    </div>
  );
}

export default App;
