import React, { Fragment } from 'react';
import PostList from '../components/PostList';

const Posts = () => {
  const POSTS = [
    {
      id: 1,
      name: 'Post1'
    },
    {
      id: 2,
      name: 'Post2'
    }
  ];
  return (
    <Fragment>
      <p> Post Page</p>
      <PostList items={POSTS} />
    </Fragment>
  );
};

export default Posts;
