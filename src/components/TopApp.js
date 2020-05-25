import React from 'react';
import styled from 'styled-components';

import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';

const TopAppIndex = styled.div`
  font-size: 1.25em;
  font-weight: 300;
  width: 2.5em;
  text-align: center;
`;

const TopAppAvatar = styled(Avatar)`
  &.MuiAvatar-root {
    width: 3.8rem;
    height: 3.8rem;
    margin-right: 10px;
    border: 1px solid #E7E7E7;
  }

  &.MuiAvatar-rounded {
    border-radius: 1rem;
  }
`;

const TopAppAvatarSkeleton = styled(Skeleton)`
  &.MuiSkeleton-root {
    width: 3.8rem;
    height: 3.8rem;
    margin-right: 10px;
    border: 1px solid #E7E7E7;
    border-radius: ${props => props.variant === 'circle' ? '50%' : '1rem'}
  }
`;

const TopAppTitle = styled.div`
  text-align: left;
  font-weight: bold;
  margin-bottom: 0.2em;
`;

const TopAppCaption = styled.div`
  text-align: left;
  margin-bottom: 0.2em;
`;

const TopAppRating = styled.div`
  text-align: left;
`;

function TopApp({ index, title, caption, image, variant, loading, ...others }) {
  return (
    <Grid container alignItems="center">
      <Grid item>
        <TopAppIndex>{index}</TopAppIndex>
      </Grid>
      <Grid item>
        {
          loading ? (<TopAppAvatarSkeleton variant={variant === 'circle' ? 'circle' : 'rect'}></TopAppAvatarSkeleton>) : (<TopAppAvatar variant={variant} src={image}></TopAppAvatar>)
        }
        
      </Grid>
      <Grid item xs>
        <TopAppTitle>
          {
            loading ? (<Skeleton></Skeleton>) : (<span>{title}</span>)
          }
        </TopAppTitle>
        <TopAppCaption>
          {
            loading ? (<Skeleton></Skeleton>) : (<span>{caption}</span>)
          }
        </TopAppCaption>
      </Grid>
    </Grid>
  );
}

export default TopApp;
