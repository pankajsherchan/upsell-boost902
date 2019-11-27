import { CssBaseline } from '@material-ui/core';
import React, { Fragment } from 'react';
import CustomLineChart from '../shared/components/charts/Line';
import ContentLayout from '../shared/components/layouts/content/ContentLayout';
import PageTitle from '../shared/components/page-title/PageTitle';

const RevenueSummary = () => {
  const title = 'Revenue Summary Page';
  return (
    <Fragment>
      <CssBaseline />

      <ContentLayout>
        <PageTitle title={title}></PageTitle>
      </ContentLayout>

      <p>
        This page will have <b> Line Chart</b> that shows each day revenue in a
        line chart
      </p>

      <CustomLineChart />
    </Fragment>
  );
};

export default RevenueSummary;
