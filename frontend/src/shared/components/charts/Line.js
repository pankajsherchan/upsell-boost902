import React from 'react';
import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

const CustomLineChart = props => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={props.data}
        margin={{ top: 50, right: 30, left: 30, bottom: 5 }}
      >
        <XAxis dataKey="postDate" padding={{ left: 30, right: 30 }} />
        <YAxis type="number" />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#8884d8"
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CustomLineChart;
