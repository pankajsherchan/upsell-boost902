import { CssBaseline, Divider } from '@material-ui/core';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { Fragment, useEffect, useState } from 'react';
import ContentLayout from '../shared/components/layouts/content/ContentLayout';
import UserForm from './components/UserForm/UserForm';
import UserList from './components/UserList/UserList';

const Users = props => {
  const validate = values => {
    const errors = {};
    if (!values.firstName) {
      errors.firstName = 'Required';
    }

    if (!values.lastName) {
      errors.lastName = 'Required';
    }
    if (!values.email) {
      errors.email = 'Required';
    }

    if (!values.role) {
      errors.role = 'Required';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      role: ''
    },
    validate,
    onSubmit: async user => {
      console.log('user: ', user);
      submitUser(user);
    }
  });

  const [users, setUsers] = useState([]);

  const [isEditMode, setEditMode] = useState(false);

  useEffect(() => {
    const sendRequest = async () => {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/users`);
      setUsers(res.data.users);
    };

    sendRequest();
  }, []);

  const submitUser = async data => {
    if (isEditMode) {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };
        await axios
          .put(`${process.env.REACT_APP_API_URL}/users`, data, config)
          .then(res => {
            setUsers([...users, res.data.user]);
          });
      } catch (error) {}
    } else {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };
        await axios
          .post(`${process.env.REACT_APP_API_URL}/users`, data, config)
          .then(res => {
            console.log('res: ', res);
            setUsers([...users, res.data.user]);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const deleteUser = async (user, index) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      await axios
        .delete(`${process.env.REACT_APP_API_URL}/users/${user.id}`, config)
        .then(res => {
          users.splice(index, 1);
          setUsers([...users]);
        });
    } catch (error) {}
  };

  const updateUser = async (user, index) => {
    setEditMode(true);
    formik.setValues(user);
  };

  return (
    <Fragment>
      <CssBaseline />
      <ContentLayout>
        <div style={{ marginTop: '50px' }}>
          <UserForm formik={formik} />

          <Divider />
          <Divider />

          <UserList
            users={users}
            onDelete={deleteUser}
            onEdit={updateUser}
            submitUser={submitUser}
          />
        </div>
      </ContentLayout>
    </Fragment>
  );
};

export default Users;
