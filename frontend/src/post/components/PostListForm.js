import DateFnsUtils from '@date-io/date-fns';
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
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import React from 'react';
import './PostListForm.css';

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
    minWidth: 400
  }
}));

const PostListForm = props => {
  const classes = useStyles();

  return (
    <Container component="main">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <InfoOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Daily Posts
        </Typography>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <form
            className={classes.form}
            noValidate
            onSubmit={props.formik.handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  id="date"
                  variant="outlined"
                  label="Date"
                  type="date"
                  defaultValue=""
                  fullWidth
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true
                  }}
                  value={props.formik.values.date}
                  onChange={props.formik.handleChange}
                />

                {props.formik.errors.date ? (
                  <div className="form-error">{props.formik.errors.date}</div>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="confNum"
                  label="Conf No"
                  name="confNum"
                  autoComplete="lname"
                  type="number"
                  value={props.formik.values.confNum}
                  onChange={props.formik.handleChange}
                />
                {props.formik.errors.confNum ? (
                  <div className="form-error">
                    {props.formik.errors.confNum}
                  </div>
                ) : null}
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="rtc"
                  label="RTC"
                  name="rtc"
                  autoComplete="lname"
                  value={props.formik.values.rtc}
                  onChange={props.formik.handleChange}
                />
                {props.formik.errors.rtc ? (
                  <div className="form-error">{props.formik.errors.rtc}</div>
                ) : null}
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  autoComplete="fname"
                  name="upgradedTo"
                  variant="outlined"
                  required
                  fullWidth
                  id="upgradedTo"
                  label="Upgraded To"
                  autoFocus
                  value={props.formik.values.upgradedTo}
                  onChange={props.formik.handleChange}
                />
                {props.formik.errors.upgradedTo ? (
                  <div className="form-error">
                    {props.formik.errors.upgradedTo}
                  </div>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="unitPrice"
                  label="Unit Price"
                  name="unitPrice"
                  autoComplete="lname"
                  type="number"
                  value={props.formik.values.unitPrice}
                  onChange={props.formik.handleChange}
                />
                {props.formik.errors.unitPrice ? (
                  <div className="form-error">
                    {props.formik.errors.unitPrice}
                  </div>
                ) : null}
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="numNights"
                  label="No. Nights"
                  name="numNights"
                  autoComplete="numNights"
                  type="number"
                  value={props.formik.values.numNights}
                  onChange={props.formik.handleChange}
                />
                {props.formik.errors.numNights ? (
                  <div className="form-error">
                    {props.formik.errors.numNights}
                  </div>
                ) : null}
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="colleague"
                  label="Colleague"
                  name="colleague"
                  autoComplete="colleague"
                  value={props.formik.values.colleague}
                  onChange={props.formik.handleChange}
                  select
                >
                  <MenuItem value={'Person 1'}>Person 1</MenuItem>
                  <MenuItem value={'Person 2'}>Person 2</MenuItem>
                  <MenuItem value={'Person 3'}>Person 3</MenuItem>
                  <MenuItem value={'Person 5'}>Person 5</MenuItem>
                  <MenuItem value={'Person 6'}>Person 6</MenuItem>
                  <MenuItem value={'Person 7'}>Person 7</MenuItem>
                  <MenuItem value={'Person 8'}>Person 8</MenuItem>
                  <MenuItem value={'Person 9'}>Person 9</MenuItem>
                  <MenuItem value={'Person 10'}>Person 10</MenuItem>
                  <MenuItem value={'Person 11'}>Person 11</MenuItem>
                  <MenuItem value={'Person 12'}>Person 12</MenuItem>
                </TextField>
                {props.formik.errors.colleague ? (
                  <div className="form-error">
                    {props.formik.errors.colleague}
                  </div>
                ) : null}
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="achieved"
                  label="Remark"
                  name="remark"
                  autoComplete="remark"
                  value={props.formik.values.remark}
                  onChange={props.formik.handleChange}
                />
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
        </MuiPickersUtilsProvider>
      </div>
    </Container>
  );
};

export default PostListForm;
