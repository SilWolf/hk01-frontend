import React from 'react';
import styled from 'styled-components';

import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

const TopAppIndex = styled.div``;

const TopAppAvatar = styled(Avatar)``;

const TopAppTitle = styled.div`
  text-align: left;
`;

const TopAppCaption = styled.div`
  text-align: left;
`;

const TopAppRating = styled.div`
  text-align: left;
`;

function TopApp() {
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <TopAppIndex>1</TopAppIndex>
      </Grid>
      <Grid item>
        <TopAppAvatar></TopAppAvatar>
      </Grid>
      <Grid item xs>
        <TopAppTitle>Title</TopAppTitle>
        <TopAppCaption>Caption</TopAppCaption>
        <TopAppRating>Rating</TopAppRating>
      </Grid>
    </Grid>
  );
}

export default TopApp;
