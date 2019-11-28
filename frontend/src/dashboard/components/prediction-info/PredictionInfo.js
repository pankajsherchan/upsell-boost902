import { makeStyles } from '@material-ui/core/styles';
import React, { Fragment } from 'react';
import './PredictionInfo.css';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    overflow: 'scroll'
  },
  boldLabel: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: '16px'
  },
  dashboardInfo: {
    margin: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    fontSize: '16px'
  }
}));

const PredictionInfo = () => {
  const classes = useStyles();
  return (
    <Fragment className={classes.root}>
      <div className={classes.dashboardInfo}>
        <b className={classes.boldLabel}> Target : </b> 100
      </div>

      <div className={classes.dashboardInfo}>
        <b className={classes.boldLabel}> Achieved : </b> 80
      </div>
    </Fragment>
  );
};

export default PredictionInfo;
