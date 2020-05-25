import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useDebouncedCallback } from 'use-debounce';
import { addRecommandApps } from '../../actions/recommandApps.action';

import store from '../../store';
import { addTopApps } from '../../actions/topApps.action';

import Model_ItuneApp from '../../models/ItuneApp.model';

import ButtonBase from '@material-ui/core/ButtonBase'

import FindInPageIcon from '@material-ui/icons/FindInPage';

import './detail.page.css';

import {
  Searchbar,
  RecommandApp,
  TopApp
} from '../../components';

import styled from 'styled-components';
import axios from 'axios';

const TopToolbar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 5px 10px;
  background: #F8F8F9;
  box-shadow: 0 2px 2px #E3E4E5;
  z-index: 999;
`;

const MainPanel = styled.div`
  padding-top: 50px;
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

// const SearchAppListPanel = styled.div`
//   display: none;
//   position: fixed;
//   background: #FFFFFF;
//   width: 100vw;
//   height: 100vh;
//   top: 50px;
//   bottom: 0;
//   left: 0;
//   right: 0;
//   opacity: 0;
//   transition: top 0.3s, opacity 0.3s;
//   padding-top: 50px;
//   z-index: 10;

//   &.active {
//     display: block;
//     top: 0px;
//     opacity: 1;
//   }
// `;

const SearchNoResult = styled.div`
  text-align: center;
  color: #E4E5E6;
  margin-top: 50px;

  .MuiSvgIcon-root {
    font-size: 4rem
  }
`;

function DetailPage() {
  const recommandApps = useSelector(state => state.recommandApps);
  const topApps = useSelector(state => state.topApps);

  const [topAppsState, setTopAppsState] = useState({
    isLoading: false,
    hasMore: false,
    limit: 0
  });

  const [searchState, setSearchState] = useState({
    text: '',
    isActive: false,
    isLoading: false,
    results: [],
    showEmpty: false
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

  function handleSearchbarOnFocus(event, text) {
    setSearchState({
      ...searchState,
      isActive: true
    });
  }
  
  // function handleSearchbarOnTextChange(text) {
  //   setSearchState({
  //     ...searchState,
  //     text: text,
  //   });
  //   debouncedSearchbarOnTextChange(text);
  // }

  const [ handleSearchbarOnTextChange ] = useDebouncedCallback((event, text) => {
    if (text === '') {
      setSearchState({
        ...searchState,
        results: [],
        showEmpty: false,
      });
      return;
    }
    
    let trimmedText = text.trim();
    let results = [];
    if (trimmedText) {
      results = topApps.filter((topApp) => topApp.name.indexOf(trimmedText) !== -1);
    }

    setSearchState({
      ...searchState,
      text: trimmedText,
      results: results,
      showEmpty: results.length === 0
    });
  }, 800);

  function handleSearchbarOnBlur(event, text) {
    setSearchState({
      ...searchState,
      isActive: !!text
    });
  }

  function handleSearchbarOnCancel(event, text) {
    setSearchState({
      ...searchState,
      text: '',
      results: [],
      showEmpty: false,
    });
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
        isLoading: true,
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
          onTextChange={handleSearchbarOnTextChange}
          onBlur={handleSearchbarOnBlur}
          onCancel={handleSearchbarOnCancel}
        ></Searchbar>
      </TopToolbar>
      
      <MainPanel>
        {
          searchState.isActive ?
            <SearchAppListSection />
          :
            <div>
              <RecommandAppListSection />
              <TopAppListSection />
            </div>
        }
      </MainPanel>
    </div>
  );

  function RecommandAppListSection() {
    return <div>
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
    </div>
  }

  function TopAppListSection() {
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

  function SearchAppListSection({ isActive, ...others }) {
    if (searchState.showEmpty) {
      return <SearchNoResult>
        <div>
          <FindInPageIcon></FindInPageIcon>
        </div>
        no result.
      </SearchNoResult>
    }

    return <TopAppList>
      {
        searchState.results.map((searchApp, index) => 
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

}

export default DetailPage;
