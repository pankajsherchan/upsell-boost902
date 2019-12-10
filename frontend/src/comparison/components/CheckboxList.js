import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: 160,
    backgroundColor: theme.palette.background.paper,
    overflow: 'scroll'
  }
}));

const CheckboxList = props => {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {props.data.map(value => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <ListItem
            key={value}
            role={undefined}
            dense
            button
            onClick={props.setSelectedList(value)}
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={props.selectedList.indexOf(value) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={value} />
          </ListItem>
        );
      })}
    </List>
  );
};

export default CheckboxList;
