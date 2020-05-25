import React, { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';

import ButtonBase from '@material-ui/core/ButtonBase'
import FindInPageIcon from '@material-ui/icons/FindInPage';

import './home.page.css';

import store from '../../store';
import {
  setTopAppsState,
  setSearchState,
  setScrollTop
} from '../../actions/homePageState.action'

import {
  Searchbar,
  RecommandApp,
  TopApp
} from '../../components';

import styled from 'styled-components';

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

const SearchPanel = styled.div`
  position: fixed;
  background: #FFFFFF;
  height: 100vh;
  width: 100vw;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: scroll;
  z-index: ${props => props.active ? 10 : -1};
  padding: 50px 10px 10px 10px;
`

const SearchNoResult = styled.div`
  text-align: center;
  color: #E4E5E6;
  margin-top: 50px;

  .MuiSvgIcon-root {
    font-size: 4rem
  }
`;

function HomePage() {
  const history = useHistory();
  const topAppsState = useSelector(state => state.homePageState.topAppsState);
  const searchState = useSelector(state => state.homePageState.searchState);
  const recommandApps = useSelector(state => state.recommandApps);
  const topApps = useSelector(state => state.topApps);


  const handleScroll = useCallback((event) => {
    // Change state of scrollBottom when scrolling
    let element = event.target.scrollingElement;

    let scrollBottom = element.scrollHeight - element.scrollTop - element.clientHeight;
    if (topAppsState.hasMore && !topAppsState.isLoading && scrollBottom < 300) {
      store.dispatch(
        setTopAppsState({
          ...topAppsState,
          isLoading: true
        })
      );
    }
  }, [ topAppsState ]);

  function handleSearchbarOnFocus(event, text) {
    store.dispatch(
      setSearchState({
        ...searchState,
        isActive: true
      })
    );
  }

  const [ handleSearchbarOnTextChange ] = useDebouncedCallback((event, text) => {
    if (text === '') {
      store.dispatch(
        setSearchState({
          ...searchState,
          results: [],
          showEmpty: false,
        })
      );
      return;
    }
    
    let trimmedText = text.trim();
    let results = [];
    if (trimmedText) {
      results = topApps.filter((topApp) => topApp.name.indexOf(trimmedText) !== -1);
    }

    store.dispatch(
      setSearchState({
        ...searchState,
        text: trimmedText,
        results: results,
        showEmpty: results.length === 0
      })
    );
  }, 800);

  function handleSearchbarOnBlur(event, text) {
    store.dispatch(
      setSearchState({
        ...searchState,
        isActive: !!text
      })
    );
  }

  function handleSearchbarOnCancelWhenFocus(event, text) {
    store.dispatch(
      setSearchState({
        ...searchState,
        text: '',
        results: [],
        showEmpty: false,
      })
    );
  }

  function handleSearchbarOnCancelWhenBlur(event, text) {
    store.dispatch(
      setSearchState({
        ...searchState,
        text: '',
        results: [],
        showEmpty: false,
        isActive: false
      })
    );
  }

  function handleAppWrapperClick(app) {
    if (app.id !== null) {
      store.dispatch(setScrollTop());
      history.push(`/detail/${app.id}`);
    }
  }

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
    if (topAppsState.isLoading === true || topAppsState.limit === 0) {
      setTimeout(() => {
        let newTopAppsLimit = Math.min(topApps.length, topAppsState.limit + 10);
        if (newTopAppsLimit === topAppsState.limit) { // = no more results
          store.dispatch(
            setTopAppsState({
              isLoading: false,
              hasMore: false,
              limit: topAppsState.limit
            })
          );
        } else {
          store.dispatch(
            setTopAppsState({
              isLoading: false,
              hasMore: true,
              limit: newTopAppsLimit
            })
          );
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
          onCancelWhenFocus={handleSearchbarOnCancelWhenFocus}
          onCancelWhenBlur={handleSearchbarOnCancelWhenBlur}
          initialValue={searchState.text}
        ></Searchbar>
      </TopToolbar>
      
      <MainPanel>
        <RecommandAppListSection />
        <TopAppListSection />
      </MainPanel>

      <SearchPanel active={searchState.isActive}>
        <SearchAppListSection />
      </SearchPanel>
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
              onClick={() => {
                handleAppWrapperClick(recommandApp);
              }}
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
            onClick={() => {
              handleAppWrapperClick(topApp);
            }}
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
            onClick={() => {
              handleAppWrapperClick(searchApp);
            }}
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

export default HomePage;
