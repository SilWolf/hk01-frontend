import React from 'react';
import styled from 'styled-components';

import Avatar from '@material-ui/core/Avatar';

const SuggestionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  width: 100%;
`;

const SuggestionAvatar = styled(Avatar)`
  margin-bottom: 0.5em;

  &.MuiAvatar-root {
    width: 100%;
    height: 100%;
  }
`

const SuggestionTitle = styled.div`
  text-align: left;
`;

const SuggestionCaption = styled.div`
  text-align: left;
`;

function SuggestionItem() {
  return (
    <SuggestionWrapper>
      <SuggestionAvatar variant="rounded">
        N
      </SuggestionAvatar>
      <SuggestionTitle>Title</SuggestionTitle>
      <SuggestionCaption>Caption</SuggestionCaption>
    </SuggestionWrapper>
  );
}

export default SuggestionItem;
