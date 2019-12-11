import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import MainHeader from './MainHeader';
import './MainNavigation.css';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';

const MainNavigation = props => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const openDrawer = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawer = () => {
    // if (
    //   event.type === 'keydown' &&
    //   (event.key === 'Tab' || event.key === 'Shift')
    // ) {
    //   return;
    // }

    setDrawerIsOpen(false);
  };

  // const toggleDrawer = (side, open) => event => {
  //   if (
  //     event.type === 'keydown' &&
  //     (event.key === 'Tab' || event.key === 'Shift')
  //   ) {
  //     return;
  //   }

  //   setState({ ...state, [side]: open });
  // };

  return (
    <Fragment>
      {/* {drawerIsOpen && <Backdrop onClick={closeDrawer} />} */}
      {drawerIsOpen && (
        <SideDrawer onClose={closeDrawer}>
          <nav className="main-navigation__drawer-nav">
            <NavLinks />
          </nav>
        </SideDrawer>
      )}
      <MainHeader>
        <AppBar position="static">
          <Toolbar>
            <div className="main-navigation__menu-btn">
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={openDrawer}
              >
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
