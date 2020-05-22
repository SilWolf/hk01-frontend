import React, { useEffect, useState } from 'react';
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

  const [scrollBottom, setScrollBottom] = useState(999999);
  const [isLoadingMoreTopApps, setIsLoadingMoreTopApps] = useState(false);
  const [hasMoreTopApps, setHasMoreTopApps] = useState(true);
  const [topAppsLimit, setTopAppsLimit] = useState(0);

  function handleScroll(event) {
    // Change state of scrollBottom when scrolling
    let element = event.target.scrollingElement;
    // console.log(element.scrollHeight, element.scrollTop, element.clientHeight);

    setScrollBottom(element.scrollHeight - element.scrollTop - element.clientHeight);
  }

  // on mount: load data from APIs
  useEffect(() => {
    setHasMoreTopApps(false);
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
      setHasMoreTopApps(true);
      setIsLoadingMoreTopApps(false);
      setScrollBottom(0);
    });
  }, []);

  // on mount: bind scroll callback
  // on unmount: unbind scroll callback
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, []);

  // on change: scrollBottom
  useEffect(() => {
    // console.log(scrollBottom);
    // Load more data if not already loading, has more result, and scroll reaches bottom
    console.log(`isLoadingMoreTopApps: ${isLoadingMoreTopApps}, hasMoreTopApps: ${hasMoreTopApps}, scrollBottom: ${scrollBottom}`)
    if (!isLoadingMoreTopApps && hasMoreTopApps && scrollBottom < 300) {
      setIsLoadingMoreTopApps(true);
    }
  }, [ isLoadingMoreTopApps, hasMoreTopApps, scrollBottom ]);

  // on change: isLoadingMoreTopApps
  useEffect(() => {
    if (isLoadingMoreTopApps === true) {
      setTimeout(() => {
        let newTopAppsLimit = Math.min(topApps.length, topAppsLimit + 10);
        if (newTopAppsLimit === topAppsLimit) { // = no more results
          setHasMoreTopApps(false);
        } else {
          setTopAppsLimit(newTopAppsLimit);
          setScrollBottom(999999);
        }
        setIsLoadingMoreTopApps(false);
      }, 800); // simulate loading delay via network  
    }
  }, [ topApps.length, topAppsLimit, isLoadingMoreTopApps ]);

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
          topApps.slice(0, topAppsLimit).map((topApp, index) => 
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
          hasMoreTopApps && (
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
    </div>
  );
}

export default App;
