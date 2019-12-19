import { MenuItem } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import React from 'react';

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
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

const PostInfoForm = props => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <InfoOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Posting Info
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={props.formik.handleSubmit}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="arrival"
                variant="outlined"
                required
                fullWidth
                id="arrivals"
                label="Arrivals"
                autoFocus
                type="number"
                value={props.formik.values.arrival}
                onChange={props.formik.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="target"
                label="Target"
                name="target"
                autoComplete="lname"
                type="number"
                value={props.formik.values.target}
                onChange={props.formik.handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="totalRoom"
                variant="outlined"
                required
                fullWidth
                id="totalRoom"
                label="Total Room"
                autoFocus
                type="number"
                value={props.formik.values.totalRoom}
                onChange={props.formik.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="totalSoldRoom"
                label="Total Sold Room"
                name="totalSoldRoom"
                autoComplete="lname"
                type="number"
                value={props.formik.values.totalSoldRoom}
                onChange={props.formik.handleChange}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="achieved"
                label="Achieved"
                name="achieve"
                autoComplete="email"
                type="number"
                value={props.formik.values.achieve}
                onChange={props.formik.handleChange}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="month"
                label="Month"
                name="month"
                autoComplete="email"
                type="number"
                value={props.formik.values.month}
                onChange={props.formik.handleChange}
                select
              >
                <MenuItem value={'January'}>January</MenuItem>
                <MenuItem value={'February'}>February</MenuItem>
                <MenuItem value={'March'}>March</MenuItem>
                <MenuItem value={'April'}>April</MenuItem>
                <MenuItem value={'May'}>May</MenuItem>
                <MenuItem value={'June'}>June</MenuItem>
                <MenuItem value={'July'}>July</MenuItem>
                <MenuItem value={'August'}>August</MenuItem>
                <MenuItem value={'September'}>September</MenuItem>
                <MenuItem value={'October'}>October</MenuItem>
                <MenuItem value={'November'}>November</MenuItem>
                <MenuItem value={'December'}>December</MenuItem>
              </TextField>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default PostInfoForm;
