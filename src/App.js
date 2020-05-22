import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { addRecommandApps } from './actions/recommandApps.action';

import store from './store';
import { addTopApps } from './actions/topApps.action';
import { setSearchText, setSearchResults, clearSearch } from './actions/search.action';

import Model_ItuneApp from './models/ItuneApp.model';

import ButtonBase from '@material-ui/core/ButtonBase'

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

const RecommandAppWrapper = styled(ButtonBase)`
  &.MuiButtonBase-root {
    flex: 1 0 22vw;
    width: 22vw;
    padding: 5px 10px;
  }
`;

const TopAppList = styled.div`
`;

const TopAppWrapper = styled(ButtonBase)`
  &.MuiButtonBase-root {
    width: 100%;
    padding: 10px;
    border-bottom: 1px solid #E7E7E7;
  }
`;

function App() {
  const recommandApps = useSelector(state => state.recommandApps);
  const topApps = useSelector(state => state.topApps);
  const search = useSelector(state => state.search);

  const [topAppsState, setTopAppsState] = useState({
    isLoading: false,
    hasMore: false,
    limit: 0
  });

  const handleScroll = useCallback((event) => {
    // Change state of scrollBottom when scrolling
    let element = event.target.scrollingElement;

    let scrollBottom = element.scrollHeight - element.scrollTop - element.clientHeight;
    if (topAppsState.hasMore && !topAppsState.isLoading && scrollBottom < 300) {
      setTopAppsState({
        ...topAppsState,
        isLoading: true
      });
    }
  }, [ topAppsState ]);

  function handleSearchbarOnFocus(event) {
  }

  function handleSearchbarOnChange(event) {
    store.dispatch(setSearchText(event.target.value));
  }

  function handleSearchbarOnBlur(event) {
    if (!search.text) { // if text is empty or null
      store.dispatch(clearSearch());
    }
  }

  // on mount: load data from APIs
  useEffect(() => {
    setTopAppsState({
      isLoading: true,
      hasMore: false,
      limit: 0
    });
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

      setTopAppsState({
        isLoading: false,
        hasMore: true,
        limit: 0
      });
    });
  }, []);

  // on mount: bind scroll callback
  // on unmount: unbind scroll callback
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [ handleScroll ]);

  // on change: search.text
  useEffect(() => {
    if (!search.text) {
      store.dispatch(setSearchResults(null));
      return;
    }
    
    let trimmedText = search.text.trim();
    if (trimmedText) {
      let results = topApps.filter((topApp) => topApp.name.indexOf(trimmedText) !== -1);
      store.dispatch(setSearchResults(results));
    }
  }, [ topApps, search.text ])

  // on change: isLoadingMoreTopApps
  useEffect(() => {
    if (topAppsState.isLoading === true) {
      setTimeout(() => {
        let newTopAppsLimit = Math.min(topApps.length, topAppsState.limit + 10);
        if (newTopAppsLimit === topAppsState.limit) { // = no more results
          setTopAppsState({
            isLoading: false,
            hasMore: false,
            limit: topAppsState.limit
          });
        } else {
          setTopAppsState({
            isLoading: false,
            hasMore: true,
            limit: newTopAppsLimit
          });
        }
      }, 800); // simulate loading delay via network
    }
  }, [ topApps.length, topAppsState ]);

  return (
    <div className="App">
      <TopToolbar>
        <Searchbar
          onFocus={handleSearchbarOnFocus}
          onChange={handleSearchbarOnChange}
          onBlur={handleSearchbarOnBlur}
        ></Searchbar>
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

      {
        search.results !== null ? renderSearchAppList() : renderTopAppList()
      }

    </div>
  );

  function renderSearchAppList() {
    return <TopAppList>
      {
        search.results.map((searchApp, index) => 
          <TopAppWrapper
            key={index}
          >
            <TopApp
              title={searchApp.name}
              caption={searchApp.category}
              image={searchApp.image.url}
              variant={ index % 2 === 0 ? 'rounded' : 'circle' }
            ></TopApp>
          </TopAppWrapper>
        )
      }
    </TopAppList>
  }

  function renderTopAppList() {
    return <TopAppList>
      {
        topApps.slice(0, topAppsState.limit).map((topApp, index) => 
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
      {
        topAppsState.hasMore && (
          <div>
            <TopAppWrapper>
              <TopApp
                loading={true}
                variant="rounded"
              ></TopApp>
            </TopAppWrapper>
            <TopAppWrapper>
              <TopApp
                loading={true}
                variant="circle"
              ></TopApp>
            </TopAppWrapper>
            <TopAppWrapper>
              <TopApp
                loading={true}
                variant="rounded"
              ></TopApp>
            </TopAppWrapper>
          </div>
        )
      }
    </TopAppList>
  }

}

export default App;
