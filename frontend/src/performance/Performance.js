import { CssBaseline, Paper } from '@material-ui/core';
import React, { Fragment } from 'react';
import SimpleBarChart from '../shared/components/charts/SimpleBarChart';
import ContentLayout from '../shared/components/layouts/content/ContentLayout';
import PageTitle from '../shared/components/page-title/PageTitle';

const Performance = () => {
  const title = 'Performance Page';
  return (
    <Fragment>
      <CssBaseline />

      <ContentLayout>
        <PageTitle title={title}></PageTitle>
      </ContentLayout>

      <p> This page will have Bar Graph that measures individual performance</p>

      <Paper
        style={{
          marginLeft: 20,
          marginRight: 20,
          paddingTop: 30,
          paddingBottom: 30
        }}
      >
        <SimpleBarChart />
      </Paper>
    </Fragment>
  );
};

export default Performance;
