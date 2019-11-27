import React from 'react';
const PostItem = props => {
  return (
    <li className="post-item">
      <div className="post-item__content">
        <h2> {props.name}</h2>
      </div>
    </li>
  );
};

export default PostItem;
