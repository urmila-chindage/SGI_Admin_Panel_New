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



const NewsResults = ({ allNews, ...rest }) => {
 
  const [newsData, setNewsData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
 
  var navigate = useNavigate();

  const handleChangePage = (event , newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const deleteNewsData = async id => {
    await axios
      .delete(`https://localhost:44312/api/News?NId=${id}`)
      .then(res => {
        console.log('Record is deleted', res);
       
        navigate(0);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    
  }, [newsData]);

  return (
    <Card {...rest}>
     
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Content</TableCell>
                <TableCell>File</TableCell>
                <TableCell>Posted On</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allNews.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(news => {
                return (
                  <TableRow hover key={news.NId}>
                    <TableCell>
                      <Box alignItems="center" display="flex">
                        <Typography color="textPrimary" variant="body1">
                          {news.Title}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell><a href={news.File} target={news.File}>
                        Open File
                      </a></TableCell>
                    <TableCell>{news.CreatedDate}</TableCell>
                    <TableCell>
                        <Button
                          color="secondary"
                          variant="contained"
                          onClick={() => deleteNewsData(news.NId)}
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
       count={allNews.length}
       page={page}
       onPageChange={handleChangePage}
       rowsPerPage={rowsPerPage}
       onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
};

NewsResults.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired
};

export default NewsResults;
