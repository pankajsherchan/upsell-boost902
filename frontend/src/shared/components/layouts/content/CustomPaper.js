import {
  Divider,
  Grid,
  makeStyles,
  Paper,
  Typography
} from '@material-ui/core';
import React, { Fragment } from 'react';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary
  }
}));

const CustomPaper = props => {
  const classes = useStyles();
  return (
    <Fragment>
      <Grid item xs={12} md={4}>
        <Paper className={classes.paper}>
          <Typography variant="h6" gutterBottom>
            {props.title}
          </Typography>
          <Divider />
          {props.children}
        </Paper>
      </Grid>
    </Fragment>
  );
};

export default CustomPaper;
