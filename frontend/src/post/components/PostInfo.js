import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import PostInfoForm from './PostInfoForm';
import PostInfoTable from './PostInfoTable';

const BASE_URL = 'http://localhost:5000/api';

const PostInfo = props => {
  const [postInfo, setPostInfo] = useState({});

  function createData(
    arrival,
    target,
    totalRoom,
    totalSoldRoom,
    achieve,
    month
  ) {
    return { arrival, target, totalRoom, totalSoldRoom, achieve, month };
  }

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

  const intialRows = [
    createData(11, 159, 6.0, 24, 4.0, 'January'),
    createData(22, 237, 9.0, 37, 4.3, 'March'),
    createData(33, 262, 16.0, 24, 6.0, 'December'),
    createData(44, 305, 3.7, 67, 4.3, 'April'),
    createData(55, 356, 16.0, 49, 3.9, 'May')
  ];
  const [postInfoList, setPostInfoList] = useState(intialRows);

  useEffect(() => {
    const sendPostInfoRequest = async () => {
      const res = await axios.get(`${BASE_URL}/post-info`);
      formik.setValues(res.data.postInfo);
    };

    sendPostInfoRequest();
  }, []);

  const onDelete = (data, index) => {
    postInfoList.splice(index, 1);
    setPostInfoList([...postInfoList]);
  };

  const onEdit = (data, index) => {
    console.log('data: ', data);
    console.log('On Edit');
    formik.setValues(data);
  };

  return (
    <div>
      <PostInfoForm formik={formik} />
      <PostInfoTable
        postInfoList={postInfoList}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    </div>
  );
};

export default PostInfo;
