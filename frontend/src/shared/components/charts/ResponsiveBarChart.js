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

const data = [
  { name: 'January', scored: 4000, expected: 2400 },
  { name: 'February', scored: 3000, expected: 1398 },
  { name: 'March', scored: 2000, expected: 9800 },
  { name: 'April', scored: 2780, expected: 3908 },
  { name: 'May', scored: 1890, expected: 4800 },
  { name: 'June', scored: 2390, expected: 3800 },
  { name: 'July', scored: 3490, expected: 4300 },
  { name: 'August', scored: 3490, expected: 4300 },
  { name: 'September', scored: 3490, expected: 4300 },
  { name: 'October', scored: 3490, expected: 4300 },
  { name: 'November', scored: 3490, expected: 4300 },
  { name: 'December', scored: 3490, expected: 4300 }
];

const ResponsiveBarChart = props => {
  return (
    <ResponsiveContainer width="99%" height={225}>
      <BarChart
        width={600}
        height={300}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="name" />
        <YAxis tickSize={10} minTickGap={10} />
        <Tooltip />
        <Legend />
        <Bar dataKey="scored" fill="#303f9f" />
        <Bar dataKey="expected" fill="#01579b" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ResponsiveBarChart;
