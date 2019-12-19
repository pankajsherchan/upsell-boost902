import axios from 'axios';
import { useFormik } from 'formik';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import PostListForm from '../components/PostListForm';
import PostListTable from '../components/PostListTable';

const COMMISSION_AMOUNT = 0.05;

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
      submitPost(post);
    }
  });

  const [postList, setPostList] = useState([
    {
      id: 1,
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

  const [isEditMode, setEditMode] = useState(false);

  useEffect(() => {
    const sendRequest = async () => {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/post-info`);

      res.data.posts.map(p => {
        p.date = moment(p.date).format('DD/MM/YYYY');
        return p;
      });

      setPostList(res.data.posts);
    };

    sendRequest();
  }, []);

  const submitPost = async data => {
    if (isEditMode) {
      const updatedItemIndex = postList.findIndex(p => p.id === data.id);

      const newList = [...postList];
      newList[updatedItemIndex] = {
        ...data,
        revenue: data.numNights * data.unitPrice,
        commission: (
          COMMISSION_AMOUNT *
          data.numNights *
          data.unitPrice
        ).toFixed(2)
      };

      setPostList(newList);

      try {
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };
        await axios
          .put(`${process.env.REACT_APP_API_URL}/Posts`, data, config)
          .then(res => {});
      } catch (error) {}
    } else {
      try {
        // ! needs to be removed
        // calculate the commission and revenue
        const newData = {
          ...data,
          revenue: data.numNights * data.unitPrice,
          commission: (
            COMMISSION_AMOUNT *
            data.numNights *
            data.unitPrice
          ).toFixed(2)
        };
        console.log('newData: ', newData);
        setPostList([...postList, newData]);

        const addedData = JSON.stringify({
          ...data,
          date: moment(data.date).format('DD/MM/YYYY')
        });
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };
        await axios
          .post(`${process.env.REACT_APP_API_URL}/Posts`, addedData, config)
          .then(res => {
            setPostList([...postList, res.data.createdPost]);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const deletePost = async (post, index) => {
    // ! TODO: this needs to be removed
    postList.splice(index, 1);
    setPostList([...postList]);

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      await axios
        .delete(`${process.env.REACT_APP_API_URL}/Posts/${post.id}`, config)
        .then(res => {
          postList.splice(index, 1);
          setPostList([...postList]);
        });
    } catch (error) {}
  };

  const updatePost = async (updatedPost, index) => {
    setEditMode(true);
    formik.setValues(updatedPost);
  };

  return (
    <div>
      <PostListForm formik={formik} />
      <PostListTable
        postList={postList}
        onDelete={deletePost}
        onEdit={updatePost}
        submitPost={submitPost}
      />
    </div>
  );
};

export default PostList;
