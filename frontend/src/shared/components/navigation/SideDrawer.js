import Drawer from '@material-ui/core/Drawer';
import React from 'react';
import './SideDrawer.css';

const SideDrawer = props => (
  <Drawer open={true} onClick={props.onClose}>
    <div style={{ width: 250 }}>{props.children}</div>
  </Drawer>
);
export default SideDrawer;
