import { CssBaseline } from '@material-ui/core';
import React, { Fragment } from 'react';
import CustomLineChart from '../shared/components/charts/Line';

const RevenueSummary = () => {
  return (
    <Fragment>
      <CssBaseline />

      <p>
        This page will have <b> Line Chart</b> that shows each day revenue in a
        line chart
      </p>

      <CustomLineChart />
    </Fragment>
  );
};

export default RevenueSummary;
