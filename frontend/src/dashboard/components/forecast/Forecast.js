import { Divider, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import './Forecast.css';

const useStyles = makeStyles(theme => ({
  table: {
    marginBottom: '-10px',
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    height: 160,
    overflow: 'scroll'
  },
  tableCell: {
    fontWeight: 'bold',
    fontSize: '16px'
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    textAlign: 'center',
    height: '272px',
    width: '400px'
  }
}));

function createData(shiftName, expectedArrival, expectedUpsell) {
  return { shiftName, expectedArrival, expectedUpsell };
}

const rows = [
  createData('Morning', 159, 6.0),
  createData('Afternoon', 237, 9.0),
  createData('Night', 262, 16.0)
];

const Forecast = props => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <Typography
        variant="subtitle2"
        gutterBottom
        colorInherit
        style={{ fontSize: '1rem' }}
      >
        {props.title}
      </Typography>
      <Divider />
      <div
        style={{
          color: props.color,
          textAlign: 'center',
          padding: 10,
          fontSize: '1rem'
        }}
      >
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableCell}>Shifts</TableCell>
              <TableCell className={classes.tableCell}>Exp Arrival</TableCell>
              <TableCell className={classes.tableCell}>Exp Upsell</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.shiftName}
                </TableCell>
                <TableCell align="center">{row.expectedArrival}</TableCell>
                <TableCell align="center">{row.expectedUpsell}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Paper>
  );
};

export default Forecast;
