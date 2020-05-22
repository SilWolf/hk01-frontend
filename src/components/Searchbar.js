import React, { useState } from 'react';
import styled from 'styled-components';
import InputBase from '@material-ui/core/InputBase';

import SearchIcon from '@material-ui/icons/Search';

const SearchbarInputWrapper = styled.div`
  background-color: #E4E5E6;
  border-radius: 4px;
  position: relative;
`;

const SearchbarPlaceholder = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  color: #AFAFB3;
`;

const SearchbarInput = styled(InputBase)`
  width: 100%;

  &.MuiInputBase-root {
    line-height: 1em;
  }

  & .MuiInputBase-input {
    text-align: center;
  }

  &:focus {
    border: 0;
  }
`;

function Searchbar({ onChange, onFocus, onBlur, ...others }) {
  const [ isFocusing, setIsFocusing ] = useState(false);
  const [ text, setText ] = useState(null);

  function handleOnFocus(event) {
    setIsFocusing(true);
    if (onFocus) {
      onFocus(event);
    }
  }

  function handleOnChange(event) {
    setText(event.target.value);
    if (onChange) {
      onChange(event);
    }
  }

  function handleOnBlur(event) {
    setIsFocusing(false);
    if (onBlur) {
      onBlur(event);
    }
  }

  return (
    <div>
      <SearchbarInputWrapper>
        {
          !isFocusing && !text &&
          <SearchbarPlaceholder>
            <SearchIcon />
            <div>搜尋</div>
          </SearchbarPlaceholder>
        }
        <SearchbarInput
          onFocus={handleOnFocus}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
        ></SearchbarInput>
      </SearchbarInputWrapper>
    </div>
  );
}

export default Searchbar;
