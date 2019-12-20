import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import './RevenueTable.css';

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

const RevenueTable = props => {
  const classes = useStyles();

  return (
    <Table className={classes.table} size="small" aria-label="a dense table">
      <TableHead>
        <TableRow>
          <TableCell className={classes.tableCell}>Date</TableCell>
          <TableCell className={classes.tableCell}>Revenue</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props.data.map(row => (
          <TableRow key={row.postDate}>
            <TableCell component="th" scope="row">
              {row.postDate}
            </TableCell>
            <TableCell>{row.revenue}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default RevenueTable;
