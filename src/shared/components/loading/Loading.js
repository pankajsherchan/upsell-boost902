import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

const useStyles = makeStyles(theme => ({
  loadingMessage: {
    position: 'absolute',
    top: '40%',
    left: '40%'
  }
}));

const Loading = props => {
  const classes = useStyles();
  const { loading } = props;
  return (
    <div
      style={loading ? { display: 'block' } : { display: 'none' }}
      className={classes.loadingMessage}
    >
      <span
        role="img"
        aria-label="emoji"
        style={{
          fontSize: 58,
          textAlign: 'center',
          display: 'inline-block',
          width: '100%'
        }}
      >
        👋
      </span>
      <Typography variant="h6">Waiting for input</Typography>
    </div>
  );
};

export default Loading;
