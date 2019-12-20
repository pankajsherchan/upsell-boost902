import { CssBaseline } from '@material-ui/core';
import { useFormik } from 'formik';
import React, { Fragment } from 'react';
import ContentLayout from '../shared/components/layouts/content/ContentLayout';
import UserForm from './components/UserForm/UserForm';
import UserList from './components/UserList/UserList';

const Users = props => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: ''
    },
    onSubmit: async post => {}
  });

  return (
    <Fragment>
      <CssBaseline />
      <ContentLayout>
        <div style={{ marginTop: '50px' }}>
          <UserForm />
          <UserList />
        </div>
      </ContentLayout>
    </Fragment>
  );
};

export default Users;
