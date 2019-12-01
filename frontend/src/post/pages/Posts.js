import { CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { Fragment } from 'react';
import ContentLayout from '../../shared/components/layouts/content/ContentLayout';
import PageTitle from '../../shared/components/page-title/PageTitle';
import PostForm from '../components/PostForm';
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
  const [selectedDate, setSelectedDate] = React.useState(
    new Date('2014-08-18T21:11:54')
  );

  const handleDateChange = date => {
    setSelectedDate(date);
  };

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
    {
      title: 'Date',
      field: 'date',
      type: 'date'
    },
    {
      title: 'Conf No.',
      field: 'confNumber',
      type: 'numeric'
    },
    {
      title: 'RTC',
      field: 'rtc'
    },
    {
      title: 'Upgraded To',
      field: 'upgradedTo',
      cellStyle: {
        width: '150px'
      }
    },
    {
      title: 'Unit Price',
      field: 'unitPrice',
      type: 'numeric'
    },
    {
      title: 'No. Nights',
      field: 'numberOfNights',
      type: 'numeric'
    },
    {
      title: 'Revenue',
      field: 'revenue',
      type: 'numeric'
    },
    {
      title: 'Commn',
      field: 'commn',
      type: 'numeric'
    },
    {
      title: 'Colleague',
      field: 'colleague'
    },
    {
      title: 'Remark',
      field: 'remark'
    }
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

        <PostForm />

        <div xs={12} md={12} style={{ width: '90%' }}>
          <PostList items={POSTS} columns={columns} data={data}></PostList>
        </div>
      </ContentLayout>
    </Fragment>
  );
};

export default Posts;
