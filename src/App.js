import React from 'react';

import './App.css';

import {
  Searchbar,
  RecommandedApp,
  TopApp
} from './components';

function App() {
  return (
    <div className="App">
      <Searchbar></Searchbar>
      <div>
        <RecommandedApp></RecommandedApp>
      </div>
      <div>
        <TopApp></TopApp>
      </div>
    </div>
  );
}

export default App;
