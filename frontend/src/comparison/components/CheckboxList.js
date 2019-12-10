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
  // const [selectedList, setSelectedList] = React.useState([]);

  // const handleToggle = value => () => {
  //   console.log('value: ', value);
  //   const currentIndex = selectedList.indexOf(value);
  //   const newChecked = [...selectedList];

  //   if (currentIndex === -1) {
  //     newChecked.push(value);
  //   } else {
  //     newChecked.splice(currentIndex, 1);
  //   }

  //   setSelectedList(newChecked);
  // };

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
