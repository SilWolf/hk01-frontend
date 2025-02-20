import React from 'react';
import styled from 'styled-components';

import Avatar from '@material-ui/core/Avatar';

const RecommandAppGrid = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  width: 100%;
`;

const RecommandAppAvatar = styled(Avatar)`
  margin-bottom: 0.5em;

  &.MuiAvatar-root {
    width: 100%;
    height: 100%;
    border-radius: 26.8%;
    border: 1px solid #E7E7E7;
  }
`

const RecommandAppTitle = styled.div`
  text-align: left;
  max-width: 100%;
  height: 2.8em;
  line-height: 1.4em;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const RecommandAppCaption = styled.div`
  text-align: left;
`;

function RecommandApp({ title, caption, image, ...others }) {
  return (
    <RecommandAppGrid>
      <RecommandAppAvatar variant="rounded" src={image}>
      </RecommandAppAvatar>
      <RecommandAppTitle>{title}</RecommandAppTitle>
      <RecommandAppCaption>{caption}</RecommandAppCaption>
    </RecommandAppGrid>
  );
}

export default RecommandApp;
