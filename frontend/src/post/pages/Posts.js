import { CssBaseline } from '@material-ui/core';
import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import ContentLayout from '../../shared/components/layouts/content/ContentLayout';
import PageTitle from '../../shared/components/page-title/PageTitle';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';

const BASE_URL = 'http://localhost:5000/api';

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
      const res = await axios.get(`${BASE_URL}/Posts`);
      setData(res.data.posts);
    };
    sendRequest();
  }, []);

  const addPost = async newData => {
    try {
      const addedData = JSON.stringify(newData);
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      await axios.post(`${BASE_URL}/Posts`, addedData, config).then(res => {
        setData([...data, res.data.createdPost]);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async post => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      await axios.delete(`${BASE_URL}/Posts/${post.id}`, config).then(res => {
        const dataCopy = [...data];
        dataCopy.splice(dataCopy.indexOf(post), 1);
        setData(dataCopy);
      });
    } catch (error) {}
  };

  const updatePost = async (newData, oldData) => {
    try {
      const updatedPost = JSON.stringify(newData);
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      await axios.put(`${BASE_URL}/Posts`, updatedPost, config).then(res => {
        const dataCopy = [...data];
        dataCopy[dataCopy.indexOf(oldData)] = newData;
        setData(dataCopy);
      });
    } catch (error) {}
  };

  return (
    <Fragment>
      <CssBaseline />
      <ContentLayout>
        <PageTitle title={title}></PageTitle>

        <PostForm />

        <div xs={12} md={12} style={{ width: '90%' }}>
          {data && (
            <PostList
              columns={columns}
              data={data}
              addPost={addPost}
              deletePost={deletePost}
              updatePost={updatePost}
            ></PostList>
          )}
        </div>
      </ContentLayout>
    </Fragment>
  );
};

export default Posts;
