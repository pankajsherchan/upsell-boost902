import { CssBaseline, Divider } from '@material-ui/core';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { Fragment, useEffect, useState } from 'react';
import SimpleDialog from '../shared/components/dialog/SimpleDialog';
import ContentLayout from '../shared/components/layouts/content/ContentLayout';
import UserForm from './components/UserForm/UserForm';
import UserList from './components/UserList/UserList';

const Users = props => {
  const validate = values => {
    const errors = {};
    if (!values.firstName && checkValidation) {
      errors.firstName = 'Required';
    }

    if (!values.lastName && checkValidation) {
      errors.lastName = 'Required';
    }
    if (!values.email && checkValidation) {
      errors.email = 'Required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email) &&
      checkValidation
    ) {
      errors.email = 'Invalid email address';
    }

    if (!values.role && checkValidation) {
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
      submitUser(user);
    }
  });

  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogTitle, setDialogTitle] = useState('');

  const [users, setUsers] = useState([]);

  const [isEditMode, setEditMode] = useState(false);
  const [checkValidation, setValidation] = useState(true);

  useEffect(() => {
    const sendRequest = async () => {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/users`);
      setUsers(res.data.users);
    };

    sendRequest();
  }, []);

  useEffect(() => {
    console.log('Use Effect for showDialog');
  }, [props.showDialog]);

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
            const updatedItemIndex = users.findIndex(u => u.id === data.id);

            const newList = [...users];
            newList[updatedItemIndex] = data;

            setUsers(newList);
            showDialogBox('Success', 'User updated successfully');
            setEditMode(false);
            setValidation(false);
            formik.setValues(resetUser());
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

            if (res.data.message) {
              return showDialogBox('Error', res.data.message);
            }

            setUsers([...users, res.data.user]);
            showDialogBox('Success', 'User added successfully');
            setValidation(false);
            formik.setValues(resetUser());
          });
      } catch (error) {
        console.log('error: ', error);
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
          showDialogBox('Success', 'User deleted successfully');
        });
    } catch (error) {}
  };

  const showDialogBox = (title, message) => {
    setShowDialog(true);
    setDialogMessage(message);
    setDialogTitle(title);
  };

  const hideDialogBox = () => {
    setShowDialog(false);
  };

  const updateUser = async (user, index) => {
    setEditMode(true);
    formik.setValues(user);
  };

  const resetUser = () => {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: ''
    };
  };

  return (
    <Fragment>
      <CssBaseline />
      <ContentLayout>
        <div>
          {showDialog ? (
            <SimpleDialog
              open={showDialog}
              message={dialogMessage}
              title={dialogTitle}
              hide={hideDialogBox}
            ></SimpleDialog>
          ) : null}
        </div>

        <div style={{ marginTop: '50px' }}>
          <UserForm
            formik={formik}
            showDialog={showDialog}
            message={dialogMessage}
            title={dialogTitle}
          />

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
