import React from 'react';
import { Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

const CustomLineChart = props => {
  return (
    <LineChart width={window.innerWidth - 160} height={500} data={props.data}>
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
  );
};

export default CustomLineChart;
