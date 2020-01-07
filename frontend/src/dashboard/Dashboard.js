import { Box, CssBaseline, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';
import moment from 'moment';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import AuthContext from '../context/auth-context';
import ContentLayout from '../shared/components/layouts/content/ContentLayout';
import InfoPanel from '../shared/components/layouts/content/InfoPanel';
import PageTitle from '../shared/components/page-title/PageTitle';
import * as dateHelper from '../shared/utils/Date';
// import EXPECTATION from '../shared/constants/index';
import Forecast from './components/forecast/Forecast';
import PredictionGraph from './components/prediction-graph/PredictionGraph';
import UpsellSummary from './components/upsell-summary/UpsellSummary';
import './Dashboard.css';

const EXPECTATION = {
  MORNING_SHIFT: 10,
  AFTERNOON_SHIFT: 60,
  EVENING_SHIFT: 30
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.grey['100']
  }
}));

const Dashboard = () => {
  const title = 'Dashboard Page';

  const todaysDate = moment().format('llll');

  const initialPrediction = {
    achieve: 0,
    target: 0
  };

  const columnsValue = [
    { title: 'Name', field: 'name' },
    { title: 'Total Revenue', field: 'totalRevenue', type: 'numeric' },
    { title: 'Nights', field: 'nights', type: 'numeric' },
    { title: 'Incentive', field: 'incentive', type: 'numeric' }
  ];

  const [columns, setColumns] = useState(columnsValue);
  const [forecast, setForecast] = useState([]);
  const [dashboardInfo, setDashboardInfo] = useState({});
  const [postInfo, setPostInfo] = useState({});

  const [prediction, setPrediction] = useState(initialPrediction);

  const [target, setTarget] = useState();
  const [achieve, setAchieve] = useState();

  useEffect(() => {
    const sendRequest = async () => {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/dashboard`);
      setDashboardInfo(res.data);
      setAchieve(
        res.data.upsellSummary.map(d => d.revenue).reduce((a, b) => a + b, 0)
      );
    };
    sendRequest();
  }, []);

  useEffect(() => {
    const sendRequest = async () => {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/post-info`);

      res.data.postInfoList.map(data => {
        data.date = dateHelper.formatDate(data.date, 'MM/DD/YYYY');
        return data;
      });

      const postInfo = res.data.postInfoList.find(
        p => p.date === dateHelper.getCurrentDate()
      );

      if (postInfo) {
        setForecast(getForecast(postInfo.arrival));
        setTarget(postInfo.target);
      }

      setPostInfo(postInfo);
    };
    sendRequest();
  }, []);

  const isLoggedIn = useContext(AuthContext).isLoggedIn;
  const token = localStorage.getItem('token');

  const getForecast = arrival => {
    const forecast = [
      {
        shift: 'Morning',
        expectedArrival: ((EXPECTATION.MORNING_SHIFT / 100) * arrival).toFixed(
          2
        ),
        expectedUpsell: EXPECTATION.MORNING_SHIFT
      },
      {
        shift: 'Afternoon',
        expectedArrival: (
          (EXPECTATION.AFTERNOON_SHIFT / 100) *
          arrival
        ).toFixed(2),
        expectedUpsell: EXPECTATION.AFTERNOON_SHIFT
      },
      {
        shift: 'Evening',
        expectedArrival: ((EXPECTATION.EVENING_SHIFT / 100) * arrival).toFixed(
          2
        ),
        expectedUpsell: EXPECTATION.EVENING_SHIFT
      }
    ];
    return forecast;
  };

  if (!isLoggedIn && !token) {
    return <Redirect to="/signup" />;
  }

  return (
    <Fragment>
      <CssBaseline />
      <ContentLayout>
        <PageTitle title={title} date={todaysDate} xs={12}></PageTitle>

        {dashboardInfo.revenueInfo ? (
          <Box display="flex">
            <Box display="flex" flexDirection="column">
              <Box component="div" display="flex">
                <InfoPanel title="Required Revenue" color="#1769aa">
                  <Typography
                    variant="h6"
                    gutterBottom
                    style={{ fontSize: '1rem' }}
                  >
                    {dashboardInfo.revenueInfo.requiredRevenue}
                  </Typography>
                </InfoPanel>

                <InfoPanel title="Remaining Number Of Days" color="#1769aa">
                  <Typography
                    variant="h6"
                    gutterBottom
                    style={{ fontSize: '1rem' }}
                  >
                    {dashboardInfo.revenueInfo.remainingNumberOfDays}
                  </Typography>
                </InfoPanel>

                <InfoPanel
                  title="Upsell Revenue Required Per Day"
                  color="#1769aa"
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    style={{ fontSize: '1rem' }}
                  >
                    {dashboardInfo.revenueInfo.upsellRequiredPerDay}
                  </Typography>
                </InfoPanel>
              </Box>

              <Box component="div" display="flex">
                <InfoPanel title="Last Month Higher Achiever" color="#1769aa">
                  <Typography
                    variant="h6"
                    gutterBottom
                    style={{ fontSize: '1rem' }}
                  >
                    {dashboardInfo.revenueInfo.lastMonthAchiever}
                  </Typography>
                </InfoPanel>

                <InfoPanel title="MTD Highest Achiever" color="#1769aa">
                  <Typography
                    variant="h6"
                    gutterBottom
                    style={{ fontSize: '1rem' }}
                  >
                    {dashboardInfo.revenueInfo.mtdHighestAchiever}
                  </Typography>
                </InfoPanel>

                <InfoPanel title="YTD Highest Achiever" color="#1769aa">
                  <Typography
                    variant="h6"
                    gutterBottom
                    style={{ fontSize: '1rem' }}
                  >
                    {dashboardInfo.revenueInfo.ytdHighestAchiever}
                  </Typography>
                </InfoPanel>
              </Box>
            </Box>
            <Box component="div" display="flex" flexGrow={1}>
              <Forecast
                title="Todays Forecast"
                color="#1769aa"
                data={forecast}
              ></Forecast>
            </Box>
          </Box>
        ) : null}

        {/* TODO: height: '450px', Upsell Summary should have the height same as Prediction Graph */}
        <Box display="flex" style={{ width: '90%', marginTop: '15px' }}>
          <Box style={{ width: '65%', height: '450px' }}>
            {dashboardInfo.upsellSummary ? (
              <UpsellSummary
                columns={columns}
                data={dashboardInfo.upsellSummary}
              ></UpsellSummary>
            ) : null}
          </Box>
          <Box>
            {target && achieve ? (
              <PredictionGraph
                title="Target vs Score Graph"
                target={target}
                achieve={achieve}
              ></PredictionGraph>
            ) : null}
          </Box>
        </Box>
      </ContentLayout>
    </Fragment>
  );
};

export default Dashboard;
