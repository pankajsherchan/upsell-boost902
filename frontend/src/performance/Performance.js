import {
  CssBaseline,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Typography
} from '@material-ui/core';
import axios from 'axios';
import _ from 'lodash';
import React, { Fragment, useEffect, useState } from 'react';
import CheckboxList from '../comparison/components/CheckboxList';
import SimpleBarChart from '../shared/components/charts/SimpleBarChart';
import ContentLayout from '../shared/components/layouts/content/ContentLayout';
import CustomPaper from '../shared/components/layouts/content/CustomPaper';
import PageTitle from '../shared/components/page-title/PageTitle';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.grey['100']
  },
  paper: {
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary
  },
  chartWrapper: {
    padding: theme.spacing(3),
    margin: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary
  }
}));

const Performance = () => {
  const classes = useStyles();

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

  const title = 'Performance Page';
  let colleagueList = [];
  let DATA = [];

  const width = window.innerWidth - 800;
  const height = window.innerHeight - 400;

  const [selectedColleague, setColleague] = React.useState([]);
  const [originalColleagueList, setOriginalColleague] = React.useState([]);
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);

  useEffect(() => {
    const sendRequest = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/performance`
      );
      setData(res.data.comparisonByColleague);
      setOriginalData(res.data.comparisonByColleague);

      colleagueList = res.data.comparisonByColleague.map(d => d.name);
      colleagueList = _.orderBy(colleagueList, ['name'], ['asc']);
      setOriginalColleague(colleagueList);
      setColleague(colleagueList);
    };
    sendRequest();
  }, []);

  const onColleagueSelected = value => () => {
    const currentIndex = selectedColleague.indexOf(value);
    const newCheckedList = [...selectedColleague];

    if (currentIndex === -1) {
      let newData = [...data];

      newCheckedList.push(value);
      newData.push(originalData.filter(d => d.name === value)[0]);

      newData = _.orderBy(newData, ['name'], ['asc']);

      setData(newData);
    } else {
      newCheckedList.splice(currentIndex, 1);
      let newData = [];
      newData = data.filter(d => d.name !== value);
      newData = _.orderBy(newData, ['name'], ['asc']);
      setData(newData);
    }
    setColleague(newCheckedList);
  };
  return (
    <Fragment>
      <CssBaseline />
      <ContentLayout>
        <PageTitle title={title}></PageTitle>

        <CustomPaper title="SelectValue" xs={12}>
          {originalColleagueList ? (
            <CheckboxList
              data={originalColleagueList}
              setSelectedList={onColleagueSelected}
              selectedList={selectedColleague}
            />
          ) : null}
        </CustomPaper>

        <div xs={12} style={{ width: '70%' }}>
          <Grid item xs={12} justify="center">
            <Paper>
              <div className={classes.chartWrapper}>
                <Typography variant="h6" gutterBottom>
                  Comparison By Colleague
                </Typography>
                <Divider />
                <SimpleBarChart
                  data={data}
                  colors={colors}
                  dataKey="score"
                  height={height}
                  width={width}
                />
              </div>
            </Paper>
          </Grid>
        </div>
      </ContentLayout>
    </Fragment>
  );
};

export default Performance;
