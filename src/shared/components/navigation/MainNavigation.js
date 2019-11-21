import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import MainHeader from './MainHeader';
import './MainNavigation.css';
import NavLinks from './NavLinks';

const MainNavigation = () => {
  const signOut = () => {};
  return (
    <Fragment>
      {/* <SideDrawer>
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer> */}
      <MainHeader>
        <AppBar position="static">
          <Toolbar>
            <div className="main-navigation__menu-btn">
              <IconButton edge="start" color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
            </div>

            <Typography variant="h6" className="main-navigation__title">
              <Link to="/"> Upsell-Boost902 </Link>
            </Typography>
            <nav className="main-navigation__header-nav">
              <NavLinks />
            </nav>
          </Toolbar>
        </AppBar>
      </MainHeader>
    </Fragment>
  );
};

export default MainNavigation;
