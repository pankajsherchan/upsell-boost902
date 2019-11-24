import Divider from '@material-ui/core/Divider';
import React, { useState } from 'react';
import Forecast from './components/forecast/Forecast';
import PredictionInfo from './components/prediction-info/PredictionInfo';
import UpsellSummary from './components/upsell-summary/UpsellSummary';
import './Dashboard.css';

const Dashboard = () => {
  const columnsValue = [
    { title: 'Name', field: 'name' },
    { title: 'Total Revenue', field: 'totalRevenue' },
    { title: 'Nights', field: 'nights' },
    { title: 'Incentive', field: 'incentive' }
  ];

  const dataValue = [
    {
      name: 'test value',
      totalRevenue: 'test value',
      nights: 'test value',
      incentive: 'test value'
    },
    {
      name: 'test value',
      totalRevenue: 'test value',
      nights: 'test value',
      incentive: 'test value'
    }
  ];

  const [columns, setColumns] = useState(columnsValue);
  const [data, setData] = useState(dataValue);

  const onAddUpsellSummary = newData => {
    setData([...data, newData]);
  };

  const onUpdateUpsellSummary = (oldData, updatedData) => {
    const newList = [...data];
    const index = data.indexOf(oldData);
    newList[index] = updatedData;
    setData(newList);
  };

  const onDeleteUpsellSummary = deletedData => {
    const newList = [...data];
    const index = data.indexOf(deletedData);
    newList.splice(index, 1);
    setData(newList);
  };

  return (
    <div className="dashboard">
      <UpsellSummary
        columns={columns}
        data={data}
        addUpsellSummary={onAddUpsellSummary}
        updateUpsellSummary={onUpdateUpsellSummary}
        deleteUpsellSummary={onDeleteUpsellSummary}
      ></UpsellSummary>
      <div className="dashboard-additionalInfo">
        <PredictionInfo> </PredictionInfo>
        <Divider />
        <Forecast> </Forecast>
      </div>
    </div>
  );
};

export default Dashboard;
