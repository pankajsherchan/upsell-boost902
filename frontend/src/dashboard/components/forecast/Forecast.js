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
  }
}));

function createData(shiftName, expectedArrival, expectedUpsell) {
  return { shiftName, expectedArrival, expectedUpsell };
}

const rows = [
  createData('Morning', 159, 6.0, 24, 4.0),
  createData('Afternoon', 237, 9.0, 37, 4.3),
  createData('Night', 262, 16.0, 24, 6.0)
];

const Forecast = () => {
  const classes = useStyles();
  return (
    <Table className={classes.table} size="small" aria-label="a dense table">
      <TableHead>
        <TableRow>
          <TableCell className={classes.tableCell}>Shifts</TableCell>
          <TableCell className={classes.tableCell} align="right">
            Exp Arrival
          </TableCell>
          <TableCell className={classes.tableCell} align="right">
            Exp Upsell
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map(row => (
          <TableRow key={row.name}>
            <TableCell component="th" scope="row">
              {row.shiftName}
            </TableCell>
            <TableCell align="right">{row.expectedArrival}</TableCell>
            <TableCell align="right">{row.expectedUpsell}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Forecast;