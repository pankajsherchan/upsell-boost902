import { CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { Fragment } from 'react';
import ContentLayout from '../../shared/components/layouts/content/ContentLayout';
import CustomPaper from '../../shared/components/layouts/content/CustomPaper';
import PageTitle from '../../shared/components/page-title/PageTitle';
import PostList from '../components/PostList';

const useStyles = makeStyles(theme => ({
  boldLabel: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: '16px'
  },
  postInfo: {
    margin: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    fontSize: '16px'
  }
}));

const Posts = () => {
  const classes = useStyles();

  const title = 'Daily Posting';
  const POSTS = [
    {
      id: 1,
      name: 'Post1'
    },
    {
      id: 2,
      name: 'Post2'
    }
  ];

  const columns = [
    { title: 'Date', field: 'date' },
    { title: 'Conf No.', field: 'confNumber' },
    { title: 'RTC', field: 'rtc' },
    { title: 'Upgraded To', field: 'upgradedTo' },
    { title: 'Unit Price', field: 'unitPrice' },
    { title: 'No. Nights', field: 'numberOfNights' },
    { title: 'Revenue', field: 'revenue' },
    { title: 'Commn', field: 'commn' },
    { title: 'Colleague', field: 'colleague' },
    { title: 'Remark', field: 'remark' }
  ];

  const data = [
    {
      date: 'test value',
      confNumber: 'test value',
      rtc: 'test value',
      upgradedTo: 'test value',
      unitPrice: 'test value',
      numberOfNights: 'test value',
      revenue: 'test value',
      commn: 'test value',
      colleague: 'test value',
      remark: 'test value'
    },
    {
      date: 'test value 2',
      confNumber: 'test value 2',
      rtc: 'test value 2',
      upgradedTo: 'test value 2',
      unitPrice: 'test value 2',
      numberOfNights: 'test value 2',
      revenue: 'test value 2',
      commn: 'test value 2',
      colleague: 'test value 2',
      remark: 'test value 2'
    }
  ];

  return (
    <Fragment>
      <CssBaseline />
      <ContentLayout>
        <PageTitle title={title}></PageTitle>

        <CustomPaper title="Today's Arrival" xs={6}>
          <div className={classes.postInfo}>
            <b className={classes.boldLabel}> Arrivals : </b> 200
          </div>
        </CustomPaper>

        <CustomPaper title="Target vs Achieved" xs={6}>
          <div className={classes.postInfo}>
            <b className={classes.boldLabel}> Target : </b> 100
          </div>

          <div className={classes.postInfo}>
            <b className={classes.boldLabel}> Achieved : </b> 80
          </div>

          <div className={classes.postInfo}>
            <b className={classes.boldLabel}> Achieved % : </b> 80%
          </div>
        </CustomPaper>
        <div xs={12} md={12} style={{ width: '90%' }}>
          <PostList items={POSTS} columns={columns} data={data}></PostList>
        </div>
      </ContentLayout>
    </Fragment>
  );
};

export default Posts;
