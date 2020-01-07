import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { ComposedChart, Line } from 'recharts';
import Bar from 'recharts/lib/cartesian/Bar';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
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
  console.log('props: ', props);
  return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart
        width={500}
        data={props.data}
        margin={{ top: 50, right: 30, left: 30, bottom: 5 }}
      >
        <XAxis dataKey="month" />
        <YAxis tickSize={10} minTickGap={10} />
        <Tooltip />
        <Legend />
        {props.data[0].expected ? (
          <Line
            type="monotone"
            dataKey="expected"
            stroke="orange"
            activeDot={{ r: 5 }}
          />
        ) : null}
        {props.data[0].scored ? (
          <Bar dataKey="scored" fill="orange"></Bar>
        ) : null}

        {props.data[0].adr ? <Bar dataKey="adr" fill="#303f9f"></Bar> : null}
        {props.data[0].revpar ? <Bar dataKey="revpar" fill="#01579b" /> : null}
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default ResponsiveBarChart;
