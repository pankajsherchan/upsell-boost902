import React, { Fragment } from 'react';
import Footer from './footer/Footer';
import Header from './header/Header';

const Layout = props => {
  return (
    <Fragment>
      <Header signOut={props.signOut} />
      <div>{props.children}</div>
      <Footer />
    </Fragment>
  );
};

export default Layout;
