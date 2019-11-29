import React from 'react';
import { Bar, BarChart, Cell, LabelList, Legend, XAxis, YAxis } from 'recharts';
import './SimpleBarChart.css';

const colors = [
  'red',
  'yellow',
  'blue',
  'green',
  'pink',
  'gray',
  'brown',
  'orange',
  'purple'
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
    <BarChart
      width={window.innerWidth - 160}
      height={500}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <XAxis dataKey="name" />
      <YAxis />
      <Legend />
      <Bar dataKey="score" fill="#413ea0" className="bar">
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
  );
};

export default SimpleBarChart;
