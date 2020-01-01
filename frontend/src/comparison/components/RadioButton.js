import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(3)
  },
  root: {
    width: '100%',
    height: 160,
    backgroundColor: theme.palette.background.paper,
    overflow: 'scroll'
  }
}));

const RadioButtonsGroup = props => {
  const classes = useStyles();
  //   const [value, setValue] = React.useState(props.selectedValue);

  //   const handleChange = event => {
  //     console.log('event: ', event);
  //     setValue(event.target.value);
  //   };

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <RadioGroup aria-label="year" name="year" value={props.selectedValue}>
          {props.data.map(d => (
            <FormControlLabel
              key={d}
              value={d}
              onChange={props.setSelectedValue(d)}
              control={<Radio />}
              label={d}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default RadioButtonsGroup;
