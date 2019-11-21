import React from 'react';
import PostItem from './PostItem';

const PostList = props => {
  if (props.items.length === 0) {
    return (
      <div>
        <h2> No items found </h2>
      </div>
    );
  }
  return (
    <ul>
      {props.items.map(post => (
        <PostItem key={post.id} id={post.id} name={post.name} />
      ))}
    </ul>
  );
};

export default PostList;
