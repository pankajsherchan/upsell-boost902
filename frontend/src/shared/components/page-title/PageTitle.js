import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { Fragment } from 'react';

const useStyles = makeStyles(theme => ({
  block: {
    padding: theme.spacing(1)
  },
  top: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
}));
const PageTitle = props => {
  const classes = useStyles();
  return (
    <Fragment>
      <Grid item xs={12}>
        <div className={classes.top}>
          <div className={classes.block}>
            <Typography variant="h6" gutterBottom>
              {props.title}
            </Typography>
          </div>
        </div>
      </Grid>
    </Fragment>
  );
};

export default PageTitle;
