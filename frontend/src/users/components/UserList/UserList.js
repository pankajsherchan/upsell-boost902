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

const UserList = props => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>FirstName</TableCell>
            <TableCell align="right">LastName&nbsp;</TableCell>
            <TableCell align="right">Email&nbsp;</TableCell>
            <TableCell align="right">Role&nbsp;</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.users.map((row, index) => (
            <TableRow key={row.email}>
              <TableCell>{row.firstName}</TableCell>
              <TableCell align="right">{row.lastName}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.role}</TableCell>
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

export default UserList;
