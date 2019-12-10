import React from 'react';
import { Bar, BarChart, Cell, LabelList, Legend, XAxis, YAxis } from 'recharts';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import './SimpleBarChart.css';

const colors = [
  '#1565c0',
  '#ef6c00',
  '#e91e63',
  '#b71c1c',
  '#009688',
  '#6200ea',
  '#5d4037',
  '#37474f',
  '#4a148c'
];

const data = [
  {
    name: 'Person 1',
    score: 3900
  },
  {
    name: 'Person 2',
    score: 2400
  },
  {
    name: 'Person 3',
    score: 2400
  },
  {
    name: 'Person 4',
    score: 3900
  },
  {
    name: 'Person 5',
    score: 3000
  },
  {
    name: 'Person 6',
    score: 2900
  },
  {
    name: 'Person 7',
    score: 2800
  },
  {
    name: 'Person 8',
    score: 2700
  },
  {
    name: 'Person 9',
    score: 2500
  },
  {
    name: 'Person 10',
    score: 2000
  }
];

const SimpleBarChart = () => {
  return (
    <ResponsiveContainer width={window.innerWidth - 600} height={500}>
      <BarChart
        width={window.innerWidth - 800}
        height={window.innerHeight - 400}
        data={data}
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
        <Bar dataKey="score" fill="#413ea0" className="bar" barSize={50}>
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              stroke={colors[index]}
              fill={colors[index]}
            />
          ))}
          <LabelList dataKey="score" position="top" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SimpleBarChart;
