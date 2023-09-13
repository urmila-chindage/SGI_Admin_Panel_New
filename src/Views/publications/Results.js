import React, { useState } from 'react';

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
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';




const Results = ({ className, publications, ...rest }) => {
  
  const [publicationData, setPublicationData] = useState([]);
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

  const deletePublicationData = async id => {
    await axios
      .delete(`https://localhost:44312/api/Publication?PId=${id}`)
      .then(res => {
        console.log('Record is deleted', res);
       
        navigate(0);
      })
      .catch(error => {
        console.log(error);
      });
  };

  
  useEffect(() => {
    
  }, [publicationData]);

  return (
    <Card {...rest}>
     
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
               
                <TableCell>Title</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Published By</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Platform</TableCell>
                <TableCell>Published in</TableCell>
                <TableCell>Posted On</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {publications
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(publication => {
                  return (
                    <TableRow hover key={publication.PId}>
                      <TableCell>
                        <Box alignItems="center" display="flex">
                          <Typography color="textPrimary" variant="body1">
                            {publication.PTitle}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{publication.PName}</TableCell>
                      <TableCell>{publication.Publishedby}</TableCell>
                      <TableCell>{publication.PCategory}</TableCell>
                      <TableCell>{publication.PPlatformName}</TableCell>
                      <TableCell>{publication.PYear}</TableCell>
                      <TableCell>{publication.CreatedDate}</TableCell>
                      <TableCell>
                        <Button
                          color="secondary"
                          variant="contained"
                          onClick={() => deletePublicationData(publication.PId)}
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
         count={publications.length}
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
  //customers: PropTypes.array.isRequired
};

export default Results;
