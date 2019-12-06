import { CssBaseline } from '@material-ui/core';
import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import CustomLineChart from '../shared/components/charts/Line';
import ContentLayout from '../shared/components/layouts/content/ContentLayout';
import PageTitle from '../shared/components/page-title/PageTitle';

const BASE_URL = 'http://localhost:5000/api';

const RevenueSummary = () => {
  const title = 'Revenue Summary Page';
  const [revenue, setRevenueData] = useState([]);

  useEffect(() => {
    const sendRequest = async () => {
      const res = await axios.get(`${BASE_URL}/revenue`);
      setRevenueData(res.data.revenueByDay);
    };
    sendRequest();
  }, []);

  return (
    <Fragment>
      <CssBaseline />

      <ContentLayout>
        <PageTitle title={title}></PageTitle>
        <CustomLineChart data={revenue} />
      </ContentLayout>
    </Fragment>
  );
};

export default RevenueSummary;
