import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import _ from 'lodash';
import React from 'react';
import './UpsellSummary.css';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto'
  },
  table: {
    fontWeight: 'bold',
    fontSize: '1rem'
  }
}));

const ccyFormat = num => {
  return `${num.toFixed(2)}`;
};

const UpsellSummary = props => {
  console.log(props);
  const classes = useStyles();
  const totalRevenue = _.sumBy(props.data, 'revenue');
  const totalNight = _.sumBy(props.data, 'night');
  const totalCommission = _.sumBy(props.data, 'commission');
  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="spanning table" size="small">
        <TableHead>
          <TableRow>
            <TableCell colSpan={3} className="table-title">
              Upsell Summary Dashboard
            </TableCell>
          </TableRow>
          <TableRow className="table-head">
            <TableCell className="table-cell">Name</TableCell>
            <TableCell align="right" className="table-cell">
              Total Revenue
            </TableCell>
            <TableCell align="right" className="table-cell">
              Nights
            </TableCell>
            <TableCell align="right" className="table-cell">
              Incentive
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map(row => (
            <TableRow key={row.colleague}>
              <TableCell>{row.colleague}</TableCell>
              <TableCell align="right">{row.revenue}</TableCell>
              <TableCell align="right">{row.night}</TableCell>
              <TableCell align="right">{row.commission}</TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell style={{ fontWeight: 'bold' }}>Total</TableCell>
            <TableCell align="right" style={{ fontWeight: 'bold' }}>
              {totalRevenue}
            </TableCell>
            <TableCell align="right" style={{ fontWeight: 'bold' }}>
              {totalNight}
            </TableCell>
            <TableCell align="right" style={{ fontWeight: 'bold' }}>
              {totalCommission}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
};

export default UpsellSummary;
