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

function TopApp({ index, title, caption, image, ...others }) {
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <TopAppIndex>{index}</TopAppIndex>
      </Grid>
      <Grid item>
        <TopAppAvatar src={image}></TopAppAvatar>
      </Grid>
      <Grid item xs>
        <TopAppTitle>{title}</TopAppTitle>
        <TopAppCaption>{caption}</TopAppCaption>
        <TopAppRating>Rating</TopAppRating>
      </Grid>
    </Grid>
  );
}

export default TopApp;
