import React from 'react';

import './App.css';

import {
  Searchbar,
  SuggestionItem,
  ListItem
} from './components';

function App() {
  return (
    <div className="App">
      <Searchbar></Searchbar>
      <div>
        <SuggestionItem></SuggestionItem>
      </div>
      <div>
        <ListItem></ListItem>
      </div>
    </div>
  );
}

export default App;
