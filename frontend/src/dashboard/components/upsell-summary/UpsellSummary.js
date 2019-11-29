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
      options={{
        headerStyle: {
          backgroundColor: '#01579b',
          color: '#FFF'
        }
      }}
    />
  );
};

export default UpsellSummary;
