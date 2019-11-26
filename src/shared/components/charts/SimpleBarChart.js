import React, { PureComponent } from 'react';
import { Bar, BarChart, LabelList, Legend, XAxis, YAxis } from 'recharts';
import './SimpleBarChart.css';

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

export default class SimpleBarChart extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/30763kr7/';

  render() {
    return (
      <BarChart
        width={1000}
        height={500}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="name" />
        <YAxis />
        {/* <Tooltip /> */}
        <Legend />
        <Bar dataKey="score" fill="#413ea0" className="bar">
          <LabelList dataKey="score" position="top" />
        </Bar>
        {/* <Bar dataKey="person2" fill="#82ca9d" className="bar" />
        <Bar dataKey="person3" fill="#82ca9d" className="bar" />
        <Bar dataKey="person4" fill="#82ca9d" />
        <Bar dataKey="person5" fill="#82ca9d" />
        <Bar dataKey="person6" fill="#82ca9d" />
        <Bar dataKey="person7" fill="#82ca9d" />
        <Bar dataKey="person8" fill="#82ca9d" />
        <Bar dataKey="person9" fill="#8884d8" />
        <Bar dataKey="person10" fill="#82ca9d" />
        <Bar dataKey="person11" fill="#82ca9d" />
        <Bar dataKey="person12" fill="#82ca9d" />
        <Bar dataKey="person13" fill="#82ca9d" />
        <Bar dataKey="person14" fill="#82ca9d" />
        <Bar dataKey="person15" fill="#82ca9d" /> */}
      </BarChart>
    );
  }
}
