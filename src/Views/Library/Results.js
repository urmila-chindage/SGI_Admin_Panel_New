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
import { useNavigate } from 'react-router-dom';
import axios from 'axios';




const Results = ({ library, ...rest }) => {
  
  const [libraryData, setLibraryData] = useState([]);
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


  const deleteLibraryData = async id => {
    await axios
      .delete(`https://localhost:44312/api/Library?LId=${id}`)
      .then(res => {
        console.log('Record is deleted', res);
        
        navigate(0);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    
  }, [libraryData]);

  return (
    <Card {...rest}>
    
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>File</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Posted On</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
             
              {library
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(lab => {
                  return (
                    <TableRow hover key={lab.LId}>
                <TableCell>
                  <Box alignItems="center" display="flex">
                    <Typography color="textPrimary" variant="body1">
                     {lab.Title}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <a href={lab.File} target="_blank">
                    Open File
                  </a>
                </TableCell>
                <TableCell>{lab.Category}</TableCell>
                <TableCell>{lab.CreatedDate}</TableCell>
                <TableCell>
                        <Button
                          color="secondary"
                          variant="contained"
                          onClick={() => deleteLibraryData(lab.LId)}
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
        count={library.length}
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
