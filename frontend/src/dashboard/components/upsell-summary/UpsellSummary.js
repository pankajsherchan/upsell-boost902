// import MaterialTable from 'material-table';
// import React, { useEffect } from 'react';

// const UpsellSummary = props => {
//   useEffect(() => {
//     console.log(props.data);
//   }, [props.data]);

//   return (
//     <MaterialTable
//       title="Upselling Dashboard"
//       columns={props.columns}
//       data={props.data}
//       options={{
//         headerStyle: {
//           backgroundColor: '#01579b',
//           color: '#FFF'
//         }
//       }}
//     />
//   );
// };

// export default UpsellSummary;

import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
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
  const classes = useStyles();
  const revenueSum = 100;
  const totalNights = 100;
  const totalCommn = 100;
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
            <TableRow key={row.name}>
              <TableCell>{row.name}</TableCell>
              <TableCell align="right">{row.totalRevenue}</TableCell>
              <TableCell align="right">{row.nights}</TableCell>
              <TableCell align="right">{row.incentive}</TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell style={{ fontWeight: 'bold' }}>Total</TableCell>
            <TableCell align="right">{revenueSum}</TableCell>
            <TableCell align="right">{totalNights}</TableCell>
            <TableCell align="right">{totalCommn}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
};

export default UpsellSummary;
