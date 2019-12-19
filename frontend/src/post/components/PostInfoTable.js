import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import React from 'react';

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

const PostInfoTable = props => {
  const classes = useStyles();

  return (
    // <TableContainer component={Paper}>
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Arrivals</TableCell>
            <TableCell align="right">Target</TableCell>
            <TableCell align="right">Total Room&nbsp;</TableCell>
            <TableCell align="right">Total Sold Room&nbsp;</TableCell>
            <TableCell align="right">Achieved&nbsp;</TableCell>
            <TableCell align="right">Month&nbsp;</TableCell>

            <TableCell align="right"> Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.postInfoList.map((row, index) => (
            <TableRow key={row.month}>
              <TableCell component="th" scope="row">
                {row.arrival}
              </TableCell>
              <TableCell align="right">{row.target}</TableCell>
              <TableCell align="right">{row.totalRoom}</TableCell>
              <TableCell align="right">{row.totalSoldRoom}</TableCell>
              <TableCell align="right">{row.achieve}</TableCell>
              <TableCell align="right">{row.month}</TableCell>
              <TableCell align="right">
                {' '}
                <EditOutlinedIcon
                  onClick={() => props.onEdit(row, index)}
                  className="actions-icon"
                />{' '}
                <DeleteOutlinedIcon
                  onClick={() => props.onDelete(row, index)}
                  className="actions-icon"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default PostInfoTable;
