import { CssBaseline } from '@material-ui/core';
import axios from 'axios';
import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';
import ContentLayout from '../../shared/components/layouts/content/ContentLayout';
import './Post.css';
// import IconLabelTabs from './Tab';
import IconLabelTabs from './Tab';

const BASE_URL = 'http://localhost:5000/api';

const Posts = () => {
  const [data, setData] = useState([
    {
      date: '05/10/2015',
      confNum: 5,
      RTC: 5,
      upgradedTo: 'ramro',
      unitPrice: 20,
      numNights: 10,
      revenue: 30,
      commission: 20,
      colleague: 'Test',
      remark: 'Test Remarking'
    }
  ]);

  useEffect(() => {
    const sendRequest = async () => {
      const res = await axios.get(`${BASE_URL}/Posts`);

      res.data.posts.map(p => {
        p.date = moment(p.date).format('DD/MM/YYYY');
        return p;
      });

      setData(res.data.posts);
    };

    sendRequest();
  }, []);

  // const addPost = async newData => {
  //   try {
  //     const addedData = JSON.stringify({
  //       ...newData,
  //       date: moment(newData.date).format('DD/MM/YYYY')
  //     });

  //     const config = {
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     };

  //     await axios.post(`${BASE_URL}/Posts`, addedData, config).then(res => {
  //       setData([...data, res.data.createdPost]);
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const deletePost = async post => {
  //   try {
  //     const config = {
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     };

  //     await axios.delete(`${BASE_URL}/Posts/${post.id}`, config).then(res => {
  //       const dataCopy = [...data];
  //       dataCopy.splice(dataCopy.indexOf(post), 1);
  //       setData(dataCopy);
  //     });
  //   } catch (error) {}
  // };

  // const updatePost = async (newData, oldData) => {
  //   try {
  //     const updatedPost = JSON.stringify(newData);
  //     const config = {
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     };

  //     await axios.put(`${BASE_URL}/Posts`, updatedPost, config).then(res => {
  //       const dataCopy = [...data];
  //       dataCopy[dataCopy.indexOf(oldData)] = newData;
  //       setData(dataCopy);
  //     });
  //   } catch (error) {}
  // };

  // const addPostInfo = async event => {
  //   event.persist();
  //   event.preventDefault();
  //   const data = new FormData(event.target);
  //   try {
  //     const config = {
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     };

  //     await axios
  //       .post(`${BASE_URL}/PostInfo`, JSON.stringify(postInfo), config)
  //       .then(res => {
  //         setPostInfo(res.data.postInfo);
  //       });
  //   } catch (error) {}
  // };

  return (
    <Fragment>
      <CssBaseline />
      <ContentLayout>
        <div style={{ marginTop: '20px' }}>
          <IconLabelTabs></IconLabelTabs>
        </div>
      </ContentLayout>
    </Fragment>
  );
};

export default Posts;
