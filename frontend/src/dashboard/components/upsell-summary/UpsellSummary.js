import MaterialTable from 'material-table';
import React, { useEffect } from 'react';
const UpsellSummary = props => {
  useEffect(() => {
    console.log(props.data);
  }, [props.data]);

  return (
    <MaterialTable
      title="Upselling Dashboard"
      columns={props.columns}
      data={props.data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              props.addUpsellSummary(newData);
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                // setData(prevData => {
                //   const data = [...prevData];
                //   data[data.indexOf(oldData)] = newData;
                //   return data;
                // });
                props.updateUpsellSummary(oldData, newData);
              }
            }, 600);
          }),
        onRowDelete: deletedData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              //   setData(prevData => {
              //     const data = [...prevData];
              //     data.splice(data.indexOf(oldData), 1);
              //     return data;
              //   });

              props.deleteUpsellSummary(deletedData);
            }, 600);
          })
      }}
    />
  );
};

export default UpsellSummary;
