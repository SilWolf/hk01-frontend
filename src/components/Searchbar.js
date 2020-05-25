import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';

import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';

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

const SearchbarCancelButton = styled(IconButton)`
  &.MuiIconButton-root {
    position: absolute;
    right: 4px;
    padding: 0;
    top: 0;
    bottom: 0;
  }
`;

function Searchbar({ onTextChange, onFocus, onBlur, onCancel, onCancelWhenFocus, onCancelWhenBlur, initialValue, ...others }) {
  const [ isFocusing, setIsFocusing ] = useState(false);
  const [ isCancelling, setIsCancelling ] = useState(false);
  const [ text, setText ] = useState('');
  const searchbarInput = useRef(null);

  function handleOnFocus(event) {
    setIsFocusing(true);
    if (isCancelling) { // do not callback when previous action is cancel
      setIsCancelling(false);
    } else if (onFocus) {
      onFocus(event, text);
    }
  }

  function handleOnChange(event) {
    setText(event.target.value);
    if (onTextChange) {
      onTextChange(event, event.target.value);
    }
  }

  function handleOnBlur(event) {
    setIsFocusing(false);
    if (isCancelling) { // do not callback when previous action is cancel
      setIsCancelling(false);
    } else if (onBlur) {
      onBlur(event, text);
    }
    setIsCancelling(false);
  }

  function handleCancel(event) {
    setText(''); setIsCancelling(true);
    if (onCancelWhenFocus && isFocusing) {
      onCancelWhenFocus(event, '');
    } else if (onCancelWhenBlur && !isFocusing) {
      onCancelWhenBlur(event, '');
    } else if (onCancel) {
      onCancel(event, '');
    }

    if (onTextChange) {
      onTextChange(event, '');
    }

    if (isFocusing) {
      setTimeout(() => {
        searchbarInput.current.children[0].focus();
      }, 10)
    }
  }

  useEffect(() => {
    if (initialValue !== null) {
      setText(initialValue);
    }
  }, [ initialValue ]);

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
          value={text}
          ref={searchbarInput}
        ></SearchbarInput>
        {
          text &&
          <SearchbarCancelButton
            onClick={handleCancel}
          >
            <CancelIcon></CancelIcon>
          </SearchbarCancelButton>
        }
      </SearchbarInputWrapper>
    </div>
  );
}

export default Searchbar;
