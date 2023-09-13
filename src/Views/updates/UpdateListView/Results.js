import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  Avatar,
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
import { useEffect } from 'react';
import axios from 'axios';



const Results = ({updates, ...rest }) => {
 
  const [updateData, setUpdateData] = useState([]);
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

const deleteUpdateData = async id => {
    await axios
      .delete(
        `https://localhost:44312/api/LatestUpdate/DeleteLUpdateByUId?UId=${id}`
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
    
  }, [updateData]);

  return (
    <Card {...rest}>
     
    
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>File</TableCell>
                <TableCell>Uploaded on</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {updates
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(update => {
                  return (
                    <TableRow hover key={update.UId}>
                      <TableCell>
                        <Box alignItems="center" display="flex">
                          <a href={update.Image} target="_blank">
                            <Avatar src={update.Image}>
                              {update.Image}
                            </Avatar>
                          </a>
                          <Typography color="textPrimary" variant="body1">
                            {update.Title}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{update.Description}</TableCell>
                      <TableCell>
                        <a  href={update.File} target="_blank" onClick={(e)=>e.target.value}>
                          Open File
                        </a>
                      </TableCell>
                      <TableCell>{update.CreatedDate}</TableCell>

                      <TableCell>
                        <Button
                          color="secondary"
                          variant="contained"
                          onClick={() => deleteUpdateData(update.UId)}
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
        count={updates.length}
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
