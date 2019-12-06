import { Box, CssBaseline, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import ContentLayout from '../shared/components/layouts/content/ContentLayout';
import InfoPanel from '../shared/components/layouts/content/InfoPanel';
import PageTitle from '../shared/components/page-title/PageTitle';
import Forecast from './components/forecast/Forecast';
import PredictionGraph from './components/prediction-graph/PredictionGraph';
import UpsellSummary from './components/upsell-summary/UpsellSummary';
import './Dashboard.css';

const BASE_URL = 'http://localhost:5000/api';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.grey['100']
  }
}));

const Dashboard = () => {
  const title = 'Dashboard Page';
  const classes = useStyles();

  const columnsValue = [
    { title: 'Name', field: 'name' },
    { title: 'Total Revenue', field: 'totalRevenue', type: 'numeric' },
    { title: 'Nights', field: 'nights', type: 'numeric' },
    { title: 'Incentive', field: 'incentive', type: 'numeric' }
  ];
  const [columns, setColumns] = useState(columnsValue);
  const [data, setData] = useState([]);
  const [postInfo, setPostInfo] = useState({});

  useEffect(() => {
    const sendRequest = async () => {
      const res = await axios.get(`${BASE_URL}/dashboard`);
      setData(res.data.dealSummary);
    };
    sendRequest();
  }, []);

  useEffect(() => {
    const sendRequest = async () => {
      const res = await axios.get(`${BASE_URL}/post-info`);
      setPostInfo(res.data.postInfo[0]);
    };
    sendRequest();
  }, []);

  return (
    <Fragment>
      <CssBaseline />
      <ContentLayout>
        <PageTitle title={title} xs={12}></PageTitle>

        <Box display="flex">
          <Box display="flex" flexDirection="column">
            <Box component="div" display="flex">
              <InfoPanel title="Required Revenue" color="#1769aa">
                <Typography
                  variant="h6"
                  gutterBottom
                  style={{ fontSize: '1rem' }}
                >
                  25000
                </Typography>
              </InfoPanel>

              <InfoPanel title="Remaining Number Of Days" color="#1769aa">
                <Typography
                  variant="h6"
                  gutterBottom
                  style={{ fontSize: '1rem' }}
                >
                  5
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
                  5
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
                  Kathrene
                </Typography>
              </InfoPanel>

              <InfoPanel title="MTD Highest Achiever" color="#1769aa">
                <Typography
                  variant="h6"
                  gutterBottom
                  style={{ fontSize: '1rem' }}
                >
                  Angelique
                </Typography>
              </InfoPanel>

              <InfoPanel title="YTD Highest Achiever" color="#1769aa">
                <Typography
                  variant="h6"
                  gutterBottom
                  style={{ fontSize: '1rem' }}
                >
                  Moon
                </Typography>
              </InfoPanel>
            </Box>
          </Box>
          <Box component="div" display="flex" flexGrow={1}>
            <Forecast title="Todays Forecast" color="#1769aa"></Forecast>
          </Box>
        </Box>

        <Box display="flex" style={{ width: '90%', marginTop: '15px' }}>
          <Box style={{ width: '70%' }}>
            <UpsellSummary columns={columns} data={data}></UpsellSummary>
          </Box>
          <Box>
            <PredictionGraph
              title="Target vs Score Graph"
              data={postInfo}
            ></PredictionGraph>
          </Box>
        </Box>
      </ContentLayout>
    </Fragment>
  );
};

export default Dashboard;
