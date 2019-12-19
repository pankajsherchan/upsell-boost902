import axios from 'axios';
import { useFormik } from 'formik';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import PostListForm from './PostListForm';
import PostListTable from './PostListTable';

const BASE_URL = 'http://localhost:5000/api';

const PostList = props => {
  const formik = useFormik({
    initialValues: {
      date: '',
      confNum: '',
      rtc: '',
      upgradedTo: '',
      unitPrice: '',
      numNights: '',
      colleague: '',
      remark: ''
    },

    onSubmit: async post => {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };

        // await axios
        //   .post(`${BASE_URL}/post-info`, JSON.stringify(postInfo), config)
        //   .then(res => {
        //     formik.setValues(res.data.postInfo);
        //   });
      } catch (error) {}
    }
  });

  const [postList, setPostList] = useState([
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

      setPostList(res.data.posts);
    };

    sendRequest();
  }, []);

  const onDelete = (data, index) => {
    postList.splice(index, 1);
    setPostList([...postList]);
  };

  const onEdit = (data, index) => {
    formik.setValues(data);
  };

  return (
    <div>
      <PostListForm formik={formik} />
      <PostListTable postList={postList} onDelete={onDelete} onEdit={onEdit} />
    </div>
  );
};

export default PostList;
