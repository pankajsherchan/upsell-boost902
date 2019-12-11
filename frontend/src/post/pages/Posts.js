import { CssBaseline } from '@material-ui/core';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { Fragment, useEffect, useState } from 'react';
import ContentLayout from '../../shared/components/layouts/content/ContentLayout';
import PageTitle from '../../shared/components/page-title/PageTitle';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';

const BASE_URL = 'http://localhost:5000/api';

const Posts = () => {
  const [data, setData] = useState([]);
  const [postInfo, setPostInfo] = useState({});

  const formik = useFormik({
    initialValues: {
      arrival: '',
      target: '',
      achieve: '',
      totalRoom: '',
      totalSoldRoom: '',
      month: ''
    },
    onSubmit: async postInfo => {
      console.log('postInfo: ', postInfo);
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };

        await axios
          .post(`${BASE_URL}/post-info`, JSON.stringify(postInfo), config)
          .then(res => {
            formik.setValues(res.data.postInfo);
          });
      } catch (error) {}
    }
  });

  const title = 'Daily Posting';

  const columns = [
    {
      title: 'Date',
      field: 'date',
      type: 'date',
      format: 'MM/dd/yyyy'
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

      console.log('formattedData: ', res.data.posts);
      setData(res.data.posts);
    };

    sendRequest();
  }, []);

  useEffect(() => {
    const sendPostInfoRequest = async () => {
      const res = await axios.get(`${BASE_URL}/post-info`);
      formik.setValues(res.data.postInfo);
    };

    sendPostInfoRequest();
  }, []);

  const addPost = async newData => {
    console.log('newData: ', newData);
    // const dataToAdd = {
    //   ...newData,
    //   date: moment(date, 'YYYY/MM/DD')
    // };
    console.log('dataToAdd: ', newData);
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

  const addPostInfo = async event => {
    event.persist();
    event.preventDefault();
    const data = new FormData(event.target);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      await axios
        .post(`${BASE_URL}/PostInfo`, JSON.stringify(postInfo), config)
        .then(res => {
          setPostInfo(res.data.postInfo);
        });
    } catch (error) {}
  };

  return (
    <Fragment>
      <CssBaseline />
      <ContentLayout>
        <PageTitle title={title}></PageTitle>

        <PostForm
          postInfo={postInfo}
          addPostInfo={addPostInfo}
          formik={formik}
        />

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
