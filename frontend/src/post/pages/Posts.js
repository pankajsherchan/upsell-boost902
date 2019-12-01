import { CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { Fragment, useEffect, useState } from 'react';
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
  const [data, setData] = useState([]);

  const title = 'Daily Posting';

  const columns = [
    {
      title: 'Date',
      field: 'date',
      type: 'date'
    },
    {
      title: 'Conf No.',
      field: 'confNum',
      type: 'numeric'
    },
    {
      title: 'RTC',
      field: 'RTC'
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
      field: 'numNights',
      type: 'numeric'
    },
    {
      title: 'Revenue',
      field: 'revenue',
      type: 'numeric'
    },
    {
      title: 'Commn',
      field: 'commission',
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

  useEffect(() => {
    const sendRequest = async () => {
      const response = await fetch('http://localhost:5000/api/Posts');
      const responseData = await response.json();
      setData(responseData.posts);
    };
    sendRequest();
  }, []);

  return (
    <Fragment>
      <CssBaseline />
      <ContentLayout>
        <PageTitle title={title}></PageTitle>

        <PostForm />

        <div xs={12} md={12} style={{ width: '90%' }}>
          {data.length > 0 && (
            <PostList columns={columns} data={data}></PostList>
          )}
        </div>
      </ContentLayout>
    </Fragment>
  );
};

export default Posts;
