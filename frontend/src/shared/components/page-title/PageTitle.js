import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { Fragment } from 'react';
import './PageTitle.css';

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
      <Grid item xs={12} className={classes.block}>
        <div className="title-row">
          <Typography variant="h6" gutterBottom>
            {props.title}
          </Typography>

          <Typography variant="h6" gutterBottom>
            {props.date}
          </Typography>
        </div>
      </Grid>
    </Fragment>
  );
};

export default PageTitle;
