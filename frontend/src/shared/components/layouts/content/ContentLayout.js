import { Grid, makeStyles } from '@material-ui/core';
import React, { Fragment } from 'react';

const useStyles = makeStyles(theme => ({
  grid: {
    margin: `0 ${theme.spacing(1)}px`,
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100% - 20px)'
    }
  },
  paper: {
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary
  },
  chartWrapper: {
    padding: theme.spacing(3),
    margin: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary
  }
}));

const ContentLayout = props => {
  const classes = useStyles();
  return (
    <Fragment>
      <Grid
        spacing={4}
        alignItems="center"
        justify="center"
        container
        className={classes.grid}
      >
        {props.children}
      </Grid>
    </Fragment>
  );
};

export default ContentLayout;
