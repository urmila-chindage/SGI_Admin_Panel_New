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
  makeStyles,
  Button
} from '@mui/material';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';



const LinksResult = ({ className, importantLinks, ...rest }) => {
 
  const [linksData, setLinksData] = useState([]);
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

  
  const deleteImportantLinksData = async id => {
    await axios
      .delete(`https://localhost:44312/api/ImportantLink?ILId=${id}`)
      .then(res => {
        console.log('Record is deleted', res);
       
        navigate(0);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {}, [linksData]);

  return (
    <Card {...rest}>
     
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Content</TableCell>
                <TableCell>Raw</TableCell>
                <TableCell>File</TableCell>
                <TableCell>Posted On</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {importantLinks
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(links => {
                  return (
                    <TableRow hover key={links.ILId}>
                      <TableCell>
                        <Box
                          alignItems="center"
                          display="flex"
                          dangerouslySetInnerHTML={{ __html: links.HtmlContent }}
                        ></Box>
                      </TableCell>
                      <TableCell>
                        <Box alignItems="center" display="flex">
                          {links.HtmlContent}
                        </Box>
                      </TableCell>
                      <TableCell>
                        {links.IsFile ? (
                          <a href={links.File} target="blank">
                            Open File
                          </a>
                        ) : (
                          'No File'
                        )}
                      </TableCell>
                      <TableCell>
                        {links.CreatedDate}
                      </TableCell>
                      <TableCell>
                        <Button
                          color="secondary"
                          variant="contained"
                          onClick={() => deleteImportantLinksData(links.ILId)}
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
         count={importantLinks.length}
         page={page}
         onPageChange={handleChangePage}
         rowsPerPage={rowsPerPage}
         onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
};

LinksResult.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired
};

export default LinksResult;
