import { Box, CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { Fragment } from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.grey['100']
  },
  box: {
    height: 100,
    box: 100,
    color: 'white',
    margin: 10,
    fontSize: 20
  }
}));
const ColorPalette = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <CssBaseline />
      <Box className={classes.box} bgcolor="primary.main">
        Primary Color
      </Box>
      <Box className={classes.box} bgcolor="secondary.main">
        secondary color
      </Box>
      <Box className={classes.box} bgcolor="error.main">
        error color
      </Box>
      <Box className={classes.box} bgcolor="text.primary">
        primary text color
      </Box>
      <Box className={classes.box} bgcolor="text.secondary">
        secondary text color
      </Box>
      <Box className={classes.box} bgcolor="text.disabled">
        disabled text color
      </Box>
      <Box className={classes.box} bgcolor="text.hint">
        hint color
      </Box>
    </Fragment>
  );
};

export default ColorPalette;
