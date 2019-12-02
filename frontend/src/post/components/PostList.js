import MaterialTable from 'material-table';
import React from 'react';

const PostList = props => {
  return (
    <MaterialTable
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
    />
  );
};

export default PostList;
