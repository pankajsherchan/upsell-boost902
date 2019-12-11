import { Divider, Paper, Tooltip, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis
} from 'recharts';

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
    height: '400px',
    width: '400px',
    marginTop: '-5px'
  }
}));

const PredictionGraph = props => {
  const classes = useStyles();

  const data = [
    {
      name: 'Target vs Score',
      target: props.data.target,
      achieved: props.data.achieve
    }
  ];
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

      <ResponsiveContainer width="100%">
        <BarChart
          width={350}
          height={350}
          data={data}
          margin={{
            top: 50,
            right: 50,
            left: 50,
            bottom: 25
          }}
          label="45"
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Legend />
          <Tooltip />
          <Bar dataKey="target" fill="#303f9f" barSize={50} />
          <Bar dataKey="achieved" fill="#01579b" barSize={50} />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default PredictionGraph;
