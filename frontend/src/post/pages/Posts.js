import { CssBaseline } from '@material-ui/core';
import axios from 'axios';
import { useFormik } from 'formik';
import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';
import ContentLayout from '../../shared/components/layouts/content/ContentLayout';
import PageTitle from '../../shared/components/page-title/PageTitle';
import PostInfo from '../components/PostInfo';
import PostList from '../components/PostList';
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

  const onNumberOfNightsChange = (index, value) => {
    console.log('index: ', index);
    console.log('value: ', value);
  };

  const onUnitPriceChange = (index, value) => {
    console.log('index: ', index);
    console.log('value: ', value);
  };

  const columns = [
    {
      title: 'Date',
      field: 'date',
      type: 'date',
      format: 'DD/MM/YYYY'
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
      title: 'Unit Price',
      field: 'unitPrice',
      type: 'numeric',
      editComponent: props => (
        // <div className="MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-formControl MuiInput-formControl">
        <div>
          <input
            className="custom-input MuiInputBase-input MuiInput-input"
            type="number"
            value={props.value}
            onChange={e => onUnitPriceChange(e.target.value)}
            placeholder="Unit Price"
          />
        </div>
      )
    },

    {
      title: 'No. Nights',
      field: 'numNights',
      type: 'numeric',
      editComponent: props => (
        // <div className="MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-formControl MuiInput-formControl">
        <div>
          <input
            className="custom-input MuiInputBase-input MuiInput-input"
            type="number"
            value={props.value}
            onChange={e => onNumberOfNightsChange(e.target.value)}
            placeholder="No. Nights"
          />
        </div>
      )
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

      res.data.posts.map(p => {
        p.date = moment(p.date).format('DD/MM/YYYY');
        return p;
      });

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
    try {
      const addedData = JSON.stringify({
        ...newData,
        date: moment(newData.date).format('DD/MM/YYYY')
      });

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
        <div>
          <IconLabelTabs
            postInfo={<PostInfo />}
            dailyPost={
              data && (
                <PostList
                  columns={columns}
                  data={data}
                  addPost={addPost}
                  deletePost={deletePost}
                  updatePost={updatePost}
                ></PostList>
              )
            }
          ></IconLabelTabs>
        </div>
      </ContentLayout>
    </Fragment>
  );
};

export default Posts;
