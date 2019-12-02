import { Divider, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    textAlign: 'center',
    height: '120px',
    width: '250px'
  }
}));

const InfoPanel = props => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <Typography
        variant="subtitle2"
        gutterBottom
        colorInherit
        style={{ fontSize: '1rem', height: props.height }}
      >
        {props.title}
      </Typography>
      <Divider />
      <div
        style={{
          color: props.color,
          textAlign: 'center',
          padding: 10,
          fontSize: '1rem'
        }}
      >
        {props.children}
      </div>
    </Paper>
  );
};

export default InfoPanel;
