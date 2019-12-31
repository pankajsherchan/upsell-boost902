import { Button, MenuItem } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import React, { Fragment } from 'react';
import './UserForm.css';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(2)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  formControl: {
    margin: theme.spacing(1)
  }
}));

const UserForm = props => {
  const classes = useStyles();

  return (
    <Fragment>
      <Container component="main">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <PersonAddOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add User
          </Typography>

          <form
            className={classes.form}
            noValidate
            onSubmit={props.formik.handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  autoComplete="first"
                  value={props.formik.values.firstName}
                  onChange={props.formik.handleChange}
                />
                {props.formik.errors.firstName ? (
                  <div className="form-error">
                    {props.formik.errors.firstName}
                  </div>
                ) : null}
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  value={props.formik.values.lastName}
                  onChange={props.formik.handleChange}
                />
                {props.formik.errors.lastName ? (
                  <div className="form-error">
                    {props.formik.errors.lastName}
                  </div>
                ) : null}
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="email"
                  name="email"
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  autoFocus
                  value={props.formik.values.email}
                  onChange={props.formik.handleChange}
                />
                {props.formik.errors.email ? (
                  <div className="form-error">{props.formik.errors.email}</div>
                ) : null}
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="role"
                  label="Role"
                  name="role"
                  autoComplete="role"
                  value={props.formik.values.role}
                  onChange={props.formik.handleChange}
                  select
                >
                  <MenuItem value={'Admin'}>Admin</MenuItem>
                  <MenuItem value={'Manager'}>Manager</MenuItem>
                  <MenuItem value={'Employee'}>Employee</MenuItem>
                </TextField>
                {props.formik.errors.role ? (
                  <div className="form-error">{props.formik.errors.role}</div>
                ) : null}
              </Grid>
            </Grid>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </Fragment>
  );
};

export default UserForm;
