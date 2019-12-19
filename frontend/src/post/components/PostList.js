import { useFormik } from 'formik';
import React from 'react';
import PostListForm from './PostListForm';
import PostListTable from './PostListTable';

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

        //   await axios
        //     .post(`${BASE_URL}/post-info`, JSON.stringify(postInfo), config)
        //     .then(res => {
        //       formik.setValues(res.data.postInfo);
        //     });
      } catch (error) {}
    }
  });

  return (
    <div>
      <PostListForm formik={formik} />
      <PostListTable />
      {/* <MaterialTable
        title="Daily Posting"
        columns={props.columns}
        data={props.data}
        options={{
          headerStyle: {
            backgroundColor: '#01579b',
            color: '#FFF',
            textAlign: 'center'
          }
        }}
        editable={{
          onRowAdd: props.addPost,
          onRowUpdate: props.updatePost,
          onRowDelete: props.deletePost
        }}
      /> */}
    </div>
  );
};

export default PostList;
