import {
  CssBaseline,
  Divider,
  Grid,
  Paper,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { Fragment, useState } from 'react';
import ResponsiveBarChart from '../shared/components/charts/ResponsiveBarChart';
import ContentLayout from '../shared/components/layouts/content/ContentLayout';
import CustomPaper from '../shared/components/layouts/content/CustomPaper';
import Loading from '../shared/components/loading/Loading';
import PageTitle from '../shared/components/page-title/PageTitle';
import CheckboxList from './components/CheckboxList';
const numeral = require('numeral');
numeral.defaultFormat('0,000');

const monthRange = [
  '01 January 2019',
  '01 February 2019',
  '01 March 2019',
  '01 April 2019',
  '01 May 2019',
  '01 June 2019',
  '01 July 2019',
  '01 August 2019',
  '01 September 2019',
  '01 October 2019',
  '01 November 2019',
  '01 December 2019'
];

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.grey['100']
  },
  grid: {
    margin: `0 ${theme.spacing(1)}px`,
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100% - 20px)'
    }
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

const Comparison = () => {
  const classes = useStyles();
  const title = 'Comparison by Months';
  const DATA = [
    {
      month: 'January',
      target: 20,
      score: 10
    },
    {
      month: 'February',
      target: 25,
      score: 20
    }
  ];

  const [period, setPeriod] = useState(3);
  const [start, setStart] = useState(0);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(DATA);
  const [checked, setChecked] = React.useState([0]);

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  const comparisonValues = ['Expected', 'Scored'];

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleChangePeriod = (event, value) => {
    setPeriod(value);
    setLoading(false);
    updateValues();
  };

  const handleChangeStart = (event, value) => {
    setStart(value);
    setLoading(false);
    updateValues();
  };

  const updateValues = () => {
    const data = Array.from({ length: period + start }, (value, i) => {
      const delayed = i < start;
      return {
        name: monthRange[i]
      };
    });
    setData(data);
  };

  return (
    <Fragment>
      <CssBaseline />
      <ContentLayout>
        <PageTitle title={title}> </PageTitle>
        <CustomPaper title="SelectValue">
          <CheckboxList data={comparisonValues} />
        </CustomPaper>

        <CustomPaper title="SelectMonths">
          <CheckboxList data={months} />
        </CustomPaper>
      </ContentLayout>
      <Grid container spacing={4} justify="center">
        <Grid item xs={12} md={12}>
          <Paper className={classes.paper} style={{ position: 'relative' }}>
            <Loading loading={loading} />
            <div className={loading ? classes.loadingState : ''}>
              <Typography variant="subtitle1" gutterBottom>
                Some details
              </Typography>
              <Typography variant="body1">Details about the graph</Typography>

              <div className={classes.chartWrapper}>
                <Typography variant="h6" gutterBottom>
                  Comparison By Months
                </Typography>
                <Divider />
                <ResponsiveBarChart data={data} />
              </div>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Comparison;
