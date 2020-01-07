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
import { getCurrentYear } from '../shared/utils/Date';
import CheckboxList from './components/CheckboxList';
import RadioButton from './components/RadioButton';

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

const Comparison = () => {
  const classes = useStyles();
  const title = 'Comparison by Months';
  const DATA = [
    {
      id: 1,
      month: 'January',
      scored: 4000,
      expected: 2400,
      adr: 1110,
      revpar: 2220,
      year: '2019'
    },
    {
      id: 2,
      month: 'February',
      scored: 3000,
      expected: 1398,
      adr: 1110,
      revpar: 2220,
      year: '2019'
    },
    {
      id: 3,
      month: 'March',
      scored: 2000,
      expected: 1800,
      adr: 1110,
      revpar: 2220,
      year: '2019'
    },
    {
      id: 4,
      month: 'April',
      scored: 2780,
      expected: 3908,
      adr: 1110,
      revpar: 2220,
      year: '2019'
    },
    {
      id: 5,
      month: 'May',
      scored: 1890,
      expected: 4800,
      adr: 1110,
      revpar: 2220,
      year: '2019'
    },
    {
      id: 6,
      month: 'June',
      scored: 2390,
      expected: 3800,
      adr: 1110,
      revpar: 2220,
      year: '2019'
    },
    {
      id: 7,
      month: 'July',
      scored: 3490,
      expected: 4300,
      adr: 1110,
      revpar: 2220,
      year: '2019'
    },
    {
      id: 8,
      month: 'August',
      scored: 3490,
      expected: 4300,
      adr: 1110,
      revpar: 2220,
      year: '2019'
    },
    {
      id: 9,
      month: 'September',
      scored: 3490,
      expected: 4300,
      adr: 1110,
      revpar: 2220,
      year: '2019'
    },
    {
      id: 10,
      month: 'October',
      scored: 3490,
      expected: 4300,
      adr: 1110,
      revpar: 2220,
      year: '2019'
    },
    {
      id: 11,
      month: 'November',
      scored: 3490,
      expected: 4300,
      adr: 1110,
      revpar: 2220,
      year: '2019'
    },
    {
      id: 12,
      month: 'December',
      scored: 3490,
      expected: 4300,
      adr: 1110,
      revpar: 2220,
      year: '2019'
    },
    {
      id: 12,
      month: 'January',
      scored: 3490,
      expected: 4300,
      adr: 1110,
      revpar: 2220,
      year: '2020'
    }
  ];

  const DUPLICATE_DATA = [...DATA];
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
  const years = ['2019', '2020', 'All'];

  const comparisonValues = ['Expected', 'Scored', 'ADR', 'RevPAR'];

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([
    DATA.filter(d => d.year === getCurrentYear())
  ]);
  const [selectedMonths, setMonths] = useState(months);
  const [selectedComparisonItems, setComparisonItems] = useState(
    comparisonValues
  );
  const [selectedYear, setYear] = useState(getCurrentYear() + '');

  const onComparisonItemSelected = value => () => {
    const currentIndex = selectedComparisonItems.indexOf(value);
    const newChecked = [...selectedComparisonItems];
    let newData = [];

    if (currentIndex === -1) {
      const key = value.toLowerCase();
      if (value === 'Scored') {
        const toAddValue = DUPLICATE_DATA.map(({ scored, ...item }) => scored);
        const newData = data.map((value, index) => ({
          ...value,
          scored: toAddValue[index]
        }));
        setData(newData);
      } else if (value === 'Expected') {
        const toAddValue = DUPLICATE_DATA.map(
          ({ expected, ...item }) => expected
        );
        const newData = data.map((value, index) => ({
          ...value,
          expected: toAddValue[index]
        }));
        setData(newData);
      } else if (value === 'ADR') {
        const toAddValue = DUPLICATE_DATA.map(({ adr, ...item }) => adr);
        const newData = data.map((value, index) => ({
          ...value,
          adr: toAddValue[index]
        }));
        setData(newData);
      } else if (value === 'RevPAR') {
        const toAddValue = DUPLICATE_DATA.map(({ revpar, ...item }) => revpar);
        const newData = data.map((value, index) => ({
          ...value,
          revpar: toAddValue[index]
        }));
        setData(newData);
      }

      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
      if (value === 'Scored') {
        newData = data.map(({ scored, ...item }) => item);
      } else if (value === 'Expected') {
        newData = data.map(({ expected, ...item }) => item);
      } else if (value === 'ADR') {
        newData = data.map(({ adr, ...item }) => item);
      } else if (value === 'RevPAR') {
        newData = data.map(({ revPar, ...item }) => item);
      }

      newData.sort(function(a, b) {
        return a.id - b.id;
      });

      setData(newData);
    }

    setComparisonItems(newChecked);
  };

  const onMonthSelected = value => () => {
    const currentIndex = selectedMonths.indexOf(value);
    const newChecked = [...selectedMonths];

    if (currentIndex === -1) {
      let newData = [...data];

      newChecked.push(value);
      newData.push(DUPLICATE_DATA.filter(d => d.month === value)[0]);
      newData = newData.sort(function(a, b) {
        return a.id - b.id;
      });
      setData(newData);
    } else {
      newChecked.splice(currentIndex, 1);
      let newData = [];
      newData = data.filter(d => d.month !== value);
      newData.sort(function(a, b) {
        return a.id - b.id;
      });
      setData(newData);
    }
    setMonths(newChecked);
  };

  const onYearSelected = value => () => {
    if (value === 'All') {
      const result = [];
      years.map(y => {
        if (y !== 'All') {
          const filteredData = DUPLICATE_DATA.filter(d => d.year === y);
          result.push(filteredData);
        }
      });
      setData([...result]);
      setYear(value);
    } else {
      const filteredData = DUPLICATE_DATA.filter(d => d.year === value + '');
      setData([[...filteredData]]);
      setYear(value + '');
      setMonths(filteredData.map(d => d.month));
    }
  };

  return (
    <Fragment>
      <CssBaseline />
      <ContentLayout>
        <PageTitle title={title} xs={12}></PageTitle>

        <CustomPaper title="SelectValue" xs={3}>
          <CheckboxList
            data={comparisonValues}
            setSelectedList={onComparisonItemSelected}
            selectedList={selectedComparisonItems}
          />
        </CustomPaper>

        <CustomPaper title="SelectMonths" xs={3}>
          <CheckboxList
            data={months}
            setSelectedList={onMonthSelected}
            selectedList={selectedMonths}
          />
        </CustomPaper>

        <CustomPaper title="SelectYear" xs={3}>
          <RadioButton
            data={years}
            setSelectedValue={onYearSelected}
            selectedValue={selectedYear}
          />
        </CustomPaper>

        <div xs={12} style={{ width: '90%' }}>
          <Grid container xs={12} justify="center">
            <Grid item xs={12} md={12}>
              <Paper className={classes.paper} style={{ position: 'relative' }}>
                <Loading loading={loading} />
                <div className={loading ? classes.loadingState : ''}>
                  <Typography variant="subtitle1" gutterBottom>
                    Some details
                  </Typography>
                  <Typography variant="body1">
                    Details about the graph
                  </Typography>

                  <div className={classes.chartWrapper}>
                    <Typography variant="h6" gutterBottom>
                      Comparison By Months
                    </Typography>
                    <Divider />
                    {data.map(d =>
                      d.length >= 1 ? <ResponsiveBarChart data={d} /> : null
                    )}
                  </div>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </ContentLayout>
    </Fragment>
  );
};

export default Comparison;
