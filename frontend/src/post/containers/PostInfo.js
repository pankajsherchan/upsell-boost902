import { Divider } from '@material-ui/core';
import axios from 'axios';
import { useFormik } from 'formik';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import PostInfoForm from '../components/PostInfoForm';
import PostInfoTable from '../components/PostInfoTable';

const PostInfo = props => {
  const validate = values => {
    const errors = {};
    if (!values.arrival) {
      errors.arrival = 'Required';
    }

    if (!values.target) {
      errors.target = 'Required';
    }
    if (!values.achieve) {
      errors.achieve = 'Required';
    }

    if (!values.totalRoom) {
      errors.totalRoom = 'Required';
    }

    if (!values.totalSoldRoom) {
      errors.totalSoldRoom = 'Required';
    }

    if (!values.date) {
      errors.date = 'Required';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      arrival: '',
      target: '',
      achieve: '',
      totalRoom: '',
      totalSoldRoom: '',
      month: '',
      date: ''
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
      res.data.postInfoList.map(p => {
        p.date = formatDisplayDate(p.date);
        return p;
      });
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
            newList[updatedItemIndex] = {
              ...data,
              date: formatDisplayDate(data.date)
            };

            newList.map(p => {
              p.date = formatDisplayDate(p.date);
              return p;
            });

            setPostInfoList(newList);
          });
      } catch (error) {}
    } else {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };
        await axios
          .post(`${process.env.REACT_APP_API_URL}/post-info`, data, config)
          .then(res => {
            const newList = [...postInfoList, res.data.postInfo];
            newList.map(p => {
              p.date = formatDisplayDate(p.date);
              return p;
            });

            setPostInfoList(newList);
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
    const formattedData = {
      ...data,
      date: formatDate(data.date) // the date has to be this format to work in the edit mode
    };
    formik.setValues(formattedData);
  };

  const formatDate = date => {
    return moment(date).format('YYYY-MM-DD');
  };

  const formatDisplayDate = date => {
    const formattedDate = moment
      .utc(date)
      .format('llll')
      .split(' ');

    console.log('formattedDate: ', formattedDate);
    return (
      formattedDate[0] +
      ' ' +
      formattedDate[1] +
      ' ' +
      formattedDate[2] +
      ' ' +
      formattedDate[3]
    );
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
