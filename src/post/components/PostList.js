import MaterialTable from 'material-table';
import React, { useState } from 'react';

const PostList = props => {
  const [columns, setColumns] = useState(props.columns);
  const [data, setData] = useState(props.data);

  if (props.items.length === 0) {
    return (
      <div>
        <h2> No items found </h2>
      </div>
    );
  }

  return (
    <MaterialTable
      title="Editable Example"
      columns={columns}
      data={data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setData(prevData => {
                const data = [...prevData];
                data.push(newData);
                return [...prevData, newData];
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setData(prevData => {
                  const data = [...prevData];
                  data[data.indexOf(oldData)] = newData;
                  return data;
                });
              }
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setData(prevData => {
                const data = [...prevData];
                data.splice(data.indexOf(oldData), 1);
                return data;
              });
            }, 600);
          })
      }}
    />
  );

  // return (
  //   <ul>
  //     {props.items.map(post => (
  //       <PostItem key={post.id} id={post.id} name={post.name} />
  //     ))}
  //   </ul>
  // );
};

export default PostList;
