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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9)
];

const PostListTable = props => {
  const classes = useStyles();

  return (
    // <TableContainer component={Paper}>
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Conf No.</TableCell>
            <TableCell align="right">RTC&nbsp;</TableCell>
            <TableCell align="right">Upgraded To&nbsp;</TableCell>
            <TableCell align="right">Unit Price&nbsp;</TableCell>
            <TableCell align="right">No. Nights &nbsp;</TableCell>
            <TableCell align="right">Revenue &nbsp;</TableCell>
            <TableCell align="right">Commission &nbsp;</TableCell>
            <TableCell align="right">Colleague &nbsp;</TableCell>
            <TableCell align="right">Remark &nbsp;</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.postList.map((row, index) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.date}
              </TableCell>
              <TableCell align="right">{row.confNum}</TableCell>
              <TableCell align="right">{row.rtc}</TableCell>
              <TableCell align="right">{row.upgradedTo}</TableCell>
              <TableCell align="right">{row.unitPrice}</TableCell>
              <TableCell align="right">{row.numNights}</TableCell>
              <TableCell align="right">{row.revenue}</TableCell>
              <TableCell align="right">{row.commission}</TableCell>
              <TableCell align="right">{row.colleague}</TableCell>
              <TableCell align="right">{row.remark}</TableCell>
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

export default PostListTable;
