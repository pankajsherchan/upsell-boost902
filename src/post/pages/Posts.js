import React, { Fragment } from 'react';
import VerticalTab from '../../shared/components/tab/VerticalTab';
import PostInfo from '../components/PostInfo';
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

  const columns = [
    { title: 'Date', field: 'date' },
    { title: 'Conf No.', field: 'confNumber' },
    { title: 'RTC', field: 'rtc' },
    { title: 'Upgraded To', field: 'upgradedTo' },
    { title: 'Unit Price', field: 'unitPrice' },
    { title: 'No. Nights', field: 'numberOfNights' },
    { title: 'Revenue', field: 'revenue' },
    { title: 'Commn', field: 'commn' },
    { title: 'Colleague', field: 'colleague' },
    { title: 'Remark', field: 'remark' }
  ];

  const data = [
    {
      date: 'test value',
      confNumber: 'test value',
      rtc: 'test value',
      upgradedTo: 'test value',
      unitPrice: 'test value',
      numberOfNights: 'test value',
      revenue: 'test value',
      commn: 'test value',
      colleague: 'test value',
      remark: 'test value'
    },
    {
      date: 'test value 2',
      confNumber: 'test value 2',
      rtc: 'test value 2',
      upgradedTo: 'test value 2',
      unitPrice: 'test value 2',
      numberOfNights: 'test value 2',
      revenue: 'test value 2',
      commn: 'test value 2',
      colleague: 'test value 2',
      remark: 'test value 2'
    }
  ];

  return (
    <Fragment>
      <VerticalTab
        list={<PostList items={POSTS} columns={columns} data={data} />}
        info={<PostInfo />}
      ></VerticalTab>
    </Fragment>
  );
};

export default Posts;
