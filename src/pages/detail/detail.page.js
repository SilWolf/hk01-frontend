import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Model_ItuneApp from '../../models/ItuneApp.model';

import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import Rating from '@material-ui/lab/Rating';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import styled from 'styled-components';
import axios from 'axios';

import FakeAppJson from '../../assets/fake_app';

const TopToolbar = styled.div`
  padding: 5px 10px;
  background: #F8F8F9;
  box-shadow: 0 2px 2px #E3E4E5;
`;

const BackButton = styled(Button)``;

const DetailPanel = styled.div`
  padding: 10px;
`;

const DetailAvatar = styled(Avatar)`
  &.MuiAvatar-root {
    width: 6rem;
    height: 6rem;
    margin-right: 10px;
    border: 1px solid #E7E7E7;
  }

  &.MuiAvatar-rounded {
    border-radius: 1rem;
  }
`;

const DetailAvatarSkeleton = styled(Skeleton)`
  &.MuiSkeleton-root {
    width: 6rem;
    height: 6rem;
    margin-right: 10px;
    border: 1px solid #E7E7E7;
    border-radius: 1rem
  }
`;

const DetailTitle = styled.div`
  text-align: left;
  font-weight: bold;
  margin-bottom: 0.2em;
`;

const DetailCaption = styled.div`
  text-align: left;
  margin-bottom: 0.2em;
`;

function DetailPage() {
  const history = useHistory();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [app, setApp] = useState(new Model_ItuneApp());

  // on mount: load data from APIs
  useEffect(() => {
    if (id !== null && id !== '') {
      setIsLoading(true);
  
      // Get app detail from API
      // axios.get(
      //   'https://itunes.apple.com/hk/lookup',
      //   {
      //     params: {
      //       id: id
      //     }
      //   }
      // ).then((response) => {
      //   let results = response.data.results;
      //   if (results.length === 1) {
      //     setApp(new Model_ItuneApp().fromJson(results[0]));
      //   }
      // }).finally(() => {
      //   setIsLoading(false);
      // });
      setApp(new Model_ItuneApp().fromJson(FakeAppJson));
      setIsLoading(false);
    }
  }, [ id ]);

  return (
    <div>
      <TopToolbar>
        <BackButton
          startIcon={<ArrowBackIosIcon />}
          onClick={() => {
            history.goBack();
          }}
        >
          Back to Home
        </BackButton>
      </TopToolbar>
      
      <DetailPanel>
        {
          isLoading && (
            <div>
              <Grid container alignItems="center">
                <Grid item>
                  <DetailAvatarSkeleton variant="rect" />
                </Grid>
                <Grid item xs>
                  <DetailTitle>
                    <Skeleton></Skeleton>
                  </DetailTitle>
                  <DetailCaption>
                    <Skeleton></Skeleton>
                  </DetailCaption>
                </Grid>
              </Grid>
            </div>
          )
        }
        {
          !isLoading && (
            <div>
              <Grid container alignItems="center">
                <Grid item>
                  <DetailAvatar variant="rounded" src={app.image.url}></DetailAvatar>
                </Grid>
                <Grid item xs>
                  <DetailTitle>{ app.name }</DetailTitle>
                  <DetailCaption>{ app.category }</DetailCaption>
                  <div>
                    <Rating
                      value={app.rating}
                      precision={0.1}
                    ></Rating>
                    <span>({app.ratingCount})</span>
                  </div>
                  <div>{app.sellerName}</div>
                </Grid>
              </Grid>
              
              <h4>Description</h4>
              <p>{app.description}</p>
            </div>
          )
        }
        
      </DetailPanel>
    </div>
  );
}

export default DetailPage;
