import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import PostInfoForm from './PostInfoForm';
import PostInfoTable from './PostInfoTable';

const BASE_URL = 'http://localhost:5000/api';

const PostInfo = props => {
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

  return (
    <div>
      <PostInfoForm formik={formik} />
      <PostInfoTable />
    </div>
  );
};

export default PostInfo;
