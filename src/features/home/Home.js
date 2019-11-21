import Button from '@material-ui/core/Button';
import React, { Fragment } from 'react';
import SignIn from '../authentication/signin/SignIn';
import SignUp from '../authentication/signup/SignUp';

const Home = props => {
  return (
    <Fragment>
      <Button
        onClick={props.authenticateUser}
        variant="contained"
        color="primary"
      >
        Go to Dashboard
      </Button>

      <SignUp />
      <SignIn />
    </Fragment>
  );
};

export default Home;
