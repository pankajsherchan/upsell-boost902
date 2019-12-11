import React from 'react';
import { Bar, BarChart, Cell, LabelList, Legend, XAxis, YAxis } from 'recharts';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import './SimpleBarChart.css';

const SimpleBarChart = props => {
  return (
    <ResponsiveContainer width="100%" height={500}>
      <BarChart
        width={props.width}
        height={props.height}
        data={props.data}
        margin={{
          top: 50,
          right: 50,
          left: 50,
          bottom: 25
        }}
      >
        <XAxis dataKey="name" />
        <YAxis domain={[0, 'dataMax + 1000']} minTickGap={20} />
        <Legend />
        <Bar
          dataKey={props.dataKey}
          fill="#413ea0"
          className="bar"
          barSize={50}
        >
          {props.data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={props.colors[index]} />
          ))}
          <LabelList dataKey={props.dataKey} position="top" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SimpleBarChart;
