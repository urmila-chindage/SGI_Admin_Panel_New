import React, { useState,useEffect } from 'react';

import PropTypes from 'prop-types';

import {
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles,
  Button
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';




const Results = ({ className, calendars, ...rest }) => {
 
  const [calendarData, setCalendarData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
 

  const navigate = useNavigate();

  const handleChangePage = (event , newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const deleteCalendarData = async id => {
    await axios
      .delete(
        `https://localhost:44312/api/Calendar?CId=${id}`
      )
      .then(res => {
        console.log('Record is deleted', res);
      
        navigate(0);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    
  }, [calendarData]);

  return (
    <Card {...rest}>
    
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Year</TableCell>
                <TableCell>Level</TableCell>
                <TableCell>File</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Posted On</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
            {calendars
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(calendar => {
                  return (
              <TableRow hover key={calendar.CId}>
              
                <TableCell>
                  <Box alignItems="center" display="flex">
                    <Typography color="textPrimary" variant="body1">
                      {calendar.Year}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>{calendar.Level}</TableCell>
                <TableCell>
                  <a href={calendar.File} target={calendar.File}>
                    Open File
                  </a>
                </TableCell>
                <TableCell>{calendar.Department}</TableCell>
                <TableCell>{calendar.CreatedDate}</TableCell>

                <TableCell>
                        <Button
                          color="secondary"
                          variant="contained"
                          onClick={() => deleteCalendarData(calendar.CId)}
                        >
                          Delete
                        </Button>
                      </TableCell>
              </TableRow>
               );
              })}
            </TableBody>
          </Table>
        </Box>
    
      <TablePagination
        component="div"
        count={calendars.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired
};

export default Results;
