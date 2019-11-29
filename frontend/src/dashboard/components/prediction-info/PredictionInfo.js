import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import './PredictionInfo.css';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: 160,
    backgroundColor: theme.palette.background.paper,
    overflow: 'scroll',
    marginBottom: '-10px'
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
    <div className={classes.root}>
      <Box
        component="div"
        fontWeight="fontWeightBold"
        m={1}
        color="text.primary"
        fontSize={15}
      >
        Required Revenue :{' '}
        <Box color="primary.main" display="inline" fontSize={18} marginLeft={1}>
          25000
        </Box>
      </Box>
      <Box
        component="div"
        fontWeight="fontWeightBold"
        m={1}
        color="text.primary"
        fontSize={15}
      >
        Remaining Number of Days :{' '}
        <Box color="primary.main" display="inline" fontSize={18} marginLeft={1}>
          5
        </Box>
      </Box>
      <Box
        component="div"
        fontWeight="fontWeightBold"
        m={1}
        color="text.primary"
        fontSize={15}
      >
        Upsell Revenue required per Day :{' '}
        <Box color="primary.main" display="inline" fontSize={18} marginLeft={1}>
          5000
        </Box>
      </Box>
    </div>
  );
};

export default PredictionInfo;
