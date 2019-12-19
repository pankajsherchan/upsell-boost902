import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import PostInfoForm from '../components/PostInfoForm';
import PostInfoTable from '../components/PostInfoTable';

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
      submitPostInfo(postInfo);
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
  const [isEditMode, setEditMode] = useState(false);

  useEffect(() => {
    const sendPostInfoRequest = async () => {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/post-info`);
      formik.setValues(res.data.postInfo);
    };

    sendPostInfoRequest();
  }, []);

  const submitPostInfo = async data => {
    if (isEditMode) {
      const updatedItemIndex = postInfoList.findIndex(p => p.id === data.id);

      const newList = [...postInfoList];
      newList[updatedItemIndex] = data;

      setPostInfoList(newList);

      try {
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };
        await axios
          .put(`${process.env.REACT_APP_API_URL}/PostInfo`, data, config)
          .then(res => {});
      } catch (error) {}
    } else {
      try {
        setPostInfoList([...postInfoList, data]);

        const addedData = JSON.stringify({
          data
        });
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };
        await axios
          .post(`${process.env.REACT_APP_API_URL}/Posts`, addedData, config)
          .then(res => {
            setPostInfoList([...postInfoList, res.data.createdPost]);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const deletePostInfo = async (data, index) => {
    // ! TODO: this needs to be removed
    postInfoList.splice(index, 1);
    setPostInfoList([...postInfoList]);

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      await axios
        .delete(`${process.env.REACT_APP_API_URL}/PostInfo/${data.id}`, config)
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
      <PostInfoTable
        postInfoList={postInfoList}
        onDelete={deletePostInfo}
        onEdit={updatePostInfo}
      />
    </div>
  );
};

export default PostInfo;
