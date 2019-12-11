import { Button, Icon } from '@material-ui/core';
import React, { useContext } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import AuthContext from '../../../context/auth-context';
import './NavLinks.css';

const NavLinks = props => {
  const isLoggedIn = useContext(AuthContext).isLoggedIn;
  const setIsLoggedIn = useContext(AuthContext).setIsLoggedIn;
  console.log('isLoggedIn: ', isLoggedIn);

  const logout = () => {
    setIsLoggedIn(false);
    props.history.push('/signup');
  };
  return (
    <div className="nav-links">
      {isLoggedIn ? (
        <div>
          <NavLink to="/" exact>
            Dashboard
          </NavLink>
          <NavLink to="revenue-summary">Revenue</NavLink>
          <NavLink to="comparison">Comparison</NavLink>
          <NavLink to="performance">Performance</NavLink>
          <NavLink to="posts">Posts</NavLink>
          <NavLink to="" className="nav_email">
            <Icon style={{ marginBottom: '-6px', marginRight: '5px' }}>
              account_box
            </Icon>
            user.email@gmail.com
          </NavLink>
          <Button
            variant="contained"
            color="primary"
            className="nav_button"
            onClick={logout}
          >
            Logout
          </Button>
        </div>
      ) : (
        <div>
          <Button
            variant="contained"
            color="primary"
            href="/signup"
            className="nav_button"
          >
            Sign up
          </Button>

          <Button
            variant="contained"
            color="primary"
            href="/signin"
            className="nav_button"
          >
            Sign in
          </Button>
        </div>
      )}
    </div>
  );
};

export default withRouter(NavLinks);
