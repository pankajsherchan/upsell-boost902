import {
  CssBaseline,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Typography
} from '@material-ui/core';
import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import CustomLineChart from '../shared/components/charts/Line';
import ContentLayout from '../shared/components/layouts/content/ContentLayout';
import CustomPaper from '../shared/components/layouts/content/CustomPaper';
import Loading from '../shared/components/loading/Loading';
import PageTitle from '../shared/components/page-title/PageTitle';
import RevenueTable from './components/RevenueTable';

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
    textAlign: 'left',
    color: theme.palette.text.secondary
  }
}));

const RevenueSummary = () => {
  const classes = useStyles();

  const title = 'Revenue Summary Page';
  const [revenue, setRevenueData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const sendRequest = async () => {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/revenue`);
      console.log('res: ', res);
      setRevenueData(res.data.revenueByDay);
    };
    sendRequest();
  }, []);

  return (
    <Fragment>
      <CssBaseline />

      <ContentLayout>
        <PageTitle title={title}></PageTitle>

        <CustomPaper title="Revenue Summary" xs={6}>
          <RevenueTable data={revenue} />
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

                  <div className={classes.chartWrapper}>
                    <Typography variant="h6" gutterBottom>
                      Revenue Comparisons By Date
                    </Typography>
                    <Divider />
                    <CustomLineChart data={revenue} />
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

export default RevenueSummary;
