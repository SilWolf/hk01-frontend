import React, { useEffect, useState } from 'react';

import Model_ItuneApp from '../../models/ItuneApp.model';

import ButtonBase from '@material-ui/core/ButtonBase'

import styled from 'styled-components';
import axios from 'axios';

const TopToolbar = styled.div`
  padding: 5px 10px;
  background: #F8F8F9;
  box-shadow: 0 2px 2px #E3E4E5;
`;

const BackButton = styled(ButtonBase)``;

const DetailPanel = styled.div`
`;

function DetailPage() {
  const [isLoading, setIsLoading] = useState(true);

  // on mount: load data from APIs
  useEffect(() => {
    setIsLoading(true);

    // // Get app detail from API
    // axios.get('https://itunes.apple.com/hk/rss/topgrossingapplications/limit=10/json').then((response) => {
    //   let entries = response.data.feed.entry;
    //   let recommandApps = entries.map((json) => {
    //     return new Model_ItuneApp().fromJson(json);
    //   });
    //   store.dispatch(addRecommandApps(recommandApps));
    // });


  }, []);

  return (
    <div>
      <TopToolbar>
        <BackButton></BackButton>
      </TopToolbar>
      
      <DetailPanel>

      </DetailPanel>
    </div>
  );
}

export default DetailPage;
