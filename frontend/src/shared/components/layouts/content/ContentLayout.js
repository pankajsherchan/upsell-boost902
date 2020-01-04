import { Grid } from '@material-ui/core';
import React from 'react';

const ContentLayout = props => {
  return (
    <Grid
      spacing={1}
      alignItems="center"
      justify="center"
      container
      style={{ marginTop: '50px' }}
    >
      {props.children}
    </Grid>
  );
};

export default ContentLayout;
