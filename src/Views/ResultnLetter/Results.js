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



const Results = ({ resultnLetter, ...rest }) => {
  
  const [resultData, setResultData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
 

  const handleChangePage = (event , newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const navigate = useNavigate();

  
  const deleteResultData = async id => {
    await axios
      .delete(`https://localhost:44312/api/ResultnLetter?RId=${id}`)
      .then(res => {
        console.log('Record is deleted', res);
        
        navigate(0);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {}, [resultData]);

  return (
    <Card  {...rest}>
     
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>description</TableCell>
                <TableCell>File</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Level</TableCell>
                <TableCell>Sem</TableCell>
                <TableCell>Posted On</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {resultnLetter
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(result => {
                  return (
                    <TableRow hover key={result.RId}>
                     
                      <TableCell>
                        <Box alignItems="center" display="flex">
                          <Typography color="textPrimary" variant="body1">
                            {result.Title}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{result.Description}</TableCell>
                      <TableCell>
                        <a href={result.File} target="blank">
                          Open File
                        </a>
                      </TableCell>
                      <TableCell>{result.Category}</TableCell>
                      <TableCell>{result.Level}</TableCell>
                      <TableCell>{result.Semester}</TableCell>
                      <TableCell>{result.CreatedDate}</TableCell>
                      <TableCell>
                        <Button
                          color="secondary"
                          variant="contained"
                          onClick={() => deleteResultData(result.RId)}
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
        count={resultnLetter.length}
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
