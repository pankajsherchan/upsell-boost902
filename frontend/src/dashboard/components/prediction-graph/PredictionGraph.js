import { Divider, Paper, Tooltip, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { Bar, BarChart, Legend, XAxis, YAxis } from 'recharts';

const useStyles = makeStyles(theme => ({
  table: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    height: 160,
    overflow: 'scroll',
    height: '400px'
  },
  tableCell: {
    fontWeight: 'bold',
    fontSize: '16px'
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    textAlign: 'center',
    height: '450px',
    width: '400px',
    marginTop: '-5px'
  }
}));

const data = [
  {
    name: 'Target vs Score',
    target: 4000,
    achieved: 2400
  }
];

const PredictionGraph = props => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <Typography
        variant="subtitle2"
        gutterBottom
        colorInherit
        style={{ fontSize: '1rem' }}
      >
        {props.title}
      </Typography>
      <Divider />
      <BarChart
        width={350}
        height={350}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5
        }}
        label="45"
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Legend />
        <Tooltip />
        <Bar dataKey="target" fill="#303f9f" />
        <Bar dataKey="achieved" fill="#01579b" />
      </BarChart>
    </Paper>
  );
};

export default PredictionGraph;
