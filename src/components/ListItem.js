import React from 'react';
import styled from 'styled-components';

import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

const ListItemIndex = styled.div``;

const ListItemAvatar = styled(Avatar)``;

const ListItemTitle = styled.div`
  text-align: left;
`;

const ListItemCaption = styled.div`
  text-align: left;
`;

const ListItemRating = styled.div`
  text-align: left;
`;

function ListItem() {
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <ListItemIndex>1</ListItemIndex>
      </Grid>
      <Grid item>
        <ListItemAvatar></ListItemAvatar>
      </Grid>
      <Grid item xs>
        <ListItemTitle>Title</ListItemTitle>
        <ListItemCaption>Caption</ListItemCaption>
        <ListItemRating>Rating</ListItemRating>
      </Grid>
    </Grid>
  );
}

export default ListItem;
