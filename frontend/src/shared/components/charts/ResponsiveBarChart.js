import { makeStyles } from '@material-ui/styles';
import React from 'react';
import Bar from 'recharts/lib/cartesian/Bar';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import BarChart from 'recharts/lib/chart/BarChart';
import Legend from 'recharts/lib/component/Legend';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import Tooltip from 'recharts/lib/component/Tooltip';

const useStyles = makeStyles(theme => ({
  loadingMessage: {
    position: 'absolute',
    top: '40%',
    left: '40%'
  },
  fillColor: theme.palette.secondary.light,
  mainColor: theme.palette.primary.main
}));

const ResponsiveBarChart = props => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        width={500}
        data={props.data}
        margin={{ top: 50, right: 30, left: 30, bottom: 5 }}
      >
        <XAxis dataKey="name" />
        <YAxis tickSize={10} minTickGap={10} />
        <Tooltip />
        <Legend />
        {props.data[0].scored ? (
          <Bar dataKey="scored" fill="#303f9f"></Bar>
        ) : null}
        {props.data[0].expected ? (
          <Bar dataKey="expected" fill="#01579b" />
        ) : null}
        {props.data[0].adr ? <Bar dataKey="adr" fill="#303f9f"></Bar> : null}
        {props.data[0].revpar ? <Bar dataKey="revpar" fill="#01579b" /> : null}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ResponsiveBarChart;
