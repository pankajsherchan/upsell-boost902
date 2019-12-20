import { Divider } from '@material-ui/core';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import PostInfoForm from '../components/PostInfoForm';
import PostInfoTable from '../components/PostInfoTable';

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
      submitPostInfo(postInfo);
    }
  });

  const [postInfoList, setPostInfoList] = useState([]);
  const [isEditMode, setEditMode] = useState(false);

  useEffect(() => {
    const sendRequest = async () => {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/post-info`);
      setPostInfoList(res.data.postInfoList);
    };

    sendRequest();
  }, []);

  const submitPostInfo = async data => {
    if (isEditMode) {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };
        await axios
          .put(`${process.env.REACT_APP_API_URL}/post-info`, data, config)
          .then(res => {
            const updatedItemIndex = postInfoList.findIndex(
              p => p.id === data.id
            );

            const newList = [...postInfoList];
            newList[updatedItemIndex] = data;

            setPostInfoList(newList);
          });
      } catch (error) {}
    } else {
      // show alert when adding postinfo for existing month
      const postInfoOfMonth = postInfoList.find(p => p.month === data.month);

      if (postInfoOfMonth) {
        return alert(
          'Post Info for this month already exists. Please edit the existing data'
        );
      }

      try {
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };
        await axios
          .post(`${process.env.REACT_APP_API_URL}/post-info`, data, config)
          .then(res => {
            console.log('res: ', res);
            setPostInfoList([...postInfoList, res.data.postInfo]);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const deletePostInfo = async (data, index) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      await axios
        .delete(`${process.env.REACT_APP_API_URL}/post-info/${data.id}`, config)
        .then(res => {
          postInfoList.splice(index, 1);
          setPostInfoList([...postInfoList]);
        });
    } catch (error) {}
  };

  const updatePostInfo = (data, index) => {
    setEditMode(true);
    formik.setValues(data);
  };

  return (
    <div>
      <PostInfoForm formik={formik} />
      <Divider />
      <Divider />
      <PostInfoTable
        postInfoList={postInfoList}
        onDelete={deletePostInfo}
        onEdit={updatePostInfo}
      />
    </div>
  );
};

export default PostInfo;
