import React from 'react';
import { Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

let data = [
  {
    day: '01',
    value: 3 / 30
  },
  {
    day: '02',
    value: 6 / 30
  },
  {
    day: '03',
    value: 22 / 30
  },
  {
    day: '04',
    value: 4 / 30
  },
  {
    day: '05',
    value: 2 / 30
  },
  {
    day: '06',
    value: 28 / 30
  },
  {
    day: '07',
    value: 24 / 30
  },
  {
    day: '08',
    value: 15 / 30
  },
  {
    day: '09',
    value: 3 / 30
  },
  {
    day: '10',
    value: 24 / 30
  },
  {
    day: '11',
    value: 20 / 30
  },
  {
    day: '12',
    value: 19 / 30
  },
  {
    day: '13',
    value: 13 / 30
  },
  {
    day: '14',
    value: 18 / 30
  },
  {
    day: '15',
    value: 24 / 30
  },
  {
    day: '16',
    value: 2 / 30
  },
  {
    day: '17',
    value: 4 / 30
  },
  {
    day: '18',
    value: 8 / 30
  },
  {
    day: '19',
    value: 1 / 30
  },
  {
    day: '20',
    value: 19 / 30
  },
  {
    day: '21',
    value: 26 / 30
  },
  {
    day: '22',
    value: 9 / 30
  },
  {
    day: '23',
    value: 25 / 30
  },
  {
    day: '24',
    value: 28 / 30
  },
  {
    day: '25',
    value: 21 / 30
  },
  {
    day: '26',
    value: 23 / 30
  },
  {
    day: '27',
    value: 13 / 30
  },
  {
    day: '28',
    value: 14 / 30
  },
  {
    day: '29',
    value: 11 / 30
  },
  {
    day: '30',
    value: 7 / 30
  }
];

const CustomLineChart = () => {
  return (
    <LineChart width={window.innerWidth - 160} height={500} data={data}>
      <XAxis dataKey="day" padding={{ left: 30, right: 30 }} />
      <YAxis type="number" domain={[0, 1]} />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="value"
        stroke="#8884d8"
        activeDot={{ r: 5 }}
      />
    </LineChart>
  );
};

export default CustomLineChart;
