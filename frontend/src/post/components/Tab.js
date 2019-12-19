import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import CalendarTodayOutlinedIcon from '@material-ui/icons/CalendarTodayOutlined';
import ListOutlinedIcon from '@material-ui/icons/ListOutlined';
import PropTypes from 'prop-types';
import React from 'react';
import PostInfo from '../containers/PostInfo';
import PostList from '../containers/PostList';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `scrollable-prevent-tab-${index}`,
    'aria-controls': `scrollable-prevent-tabpanel-${index}`
  };
}

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  }
});

export default function IconLabelTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper square className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="secondary"
        textColor="secondary"
        aria-label="icon label tabs example"
      >
        <Tab icon={<ListOutlinedIcon />} label="Daily Posting"></Tab>
        <Tab icon={<CalendarTodayOutlinedIcon />} label="Post Info"></Tab>
      </Tabs>

      <TabPanel value={value} index={0}>
        <PostList />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <PostInfo />
      </TabPanel>
    </Paper>
  );
}
