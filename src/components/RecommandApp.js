import React from 'react';
import styled from 'styled-components';

import Avatar from '@material-ui/core/Avatar';

const RecommandedAppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  width: 100%;
`;

const RecommandedAppAvatar = styled(Avatar)`
  margin-bottom: 0.5em;

  &.MuiAvatar-root {
    width: 100%;
    height: 100%;
  }
`

const RecommandedAppTitle = styled.div`
  text-align: left;
`;

const RecommandedAppCaption = styled.div`
  text-align: left;
`;

function RecommandedApp({ title, caption, image, ...others }) {
  return (
    <RecommandedAppWrapper>
      <RecommandedAppAvatar variant="rounded" src={image}>
      </RecommandedAppAvatar>
      <RecommandedAppTitle>{title}</RecommandedAppTitle>
      <RecommandedAppCaption>{caption}</RecommandedAppCaption>
    </RecommandedAppWrapper>
  );
}

export default RecommandedApp;
