import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import {
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  
  TableRow,
  Typography,
  makeStyles,
  Button,
  ListItemAvatar,
  Avatar
} from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const Results = ({
 
  handleEditDrawerOpen,
  setCurrentlyEditing,
  testimonials,
  ...rest
}) => {
 
  const [selectedTestimonial, setSelectedTestimonial] = useState([]);
 
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
 

  const handleChangePage = (event , newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  /*const getAllTestimonials = async () => {
  
    await axios
      .get('https://localhost:44312/api/Testimonials')
      .then(res => {
        setLoader(true);
        console.log(res.data.data);
        setSelectedTestimonial(res.data.data);
      })
      .catch(error => {
        console.log(error);
      });
      setLoader(false);
  };*/

  const deleteTestiminials = async id => {
    await axios
      .delete(`https://localhost:44312/api/Testimonials?TId=${id}`)
      .then(res => {
        console.log('Record is deleted', res);
        toast.success("Testimonial Data is Deleted");
      })
      .catch(error => {
        console.log(error);
      });
  };

  const editTestimonials = async id => {
    await axios
      .put(`https://localhost:44312/api/Testimonials/${id}`)
      .then(res => {
        console.log('Record is edited', res);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
   
  }, [selectedTestimonial]);

  return (
    <Card {...rest}>
      <ToastContainer />
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Profile Image</TableCell>
                <TableCell>Posted On</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
           
              {testimonials
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(testimonial => {
                  return (
                    <TableRow hover key={testimonials.TId}>
                      <TableCell>
                        <Box alignItems="center" display="flex">
                          <Typography color="textPrimary" variant="body1">
                            {testimonial.Name}
                          </Typography>
                        </Box>
                      </TableCell>

                      <TableCell>{testimonial.Desc}</TableCell>

                      <TableCell>
                        <img
                          src={testimonial.Image}
                          className="profileImage"
                        />
                      </TableCell>
                      <TableCell>{testimonial.CreatedDate.substr(0,10)}</TableCell>

                      <TableCell>
                        <Button
                          color="secondary"
                          variant="contained"
                          onClick={() => deleteTestiminials(testimonial.TId)}
                        >
                          Delete
                        </Button>
                      </TableCell>

                      <TableCell>
                        <Button
                          onClick={() => {
                            setCurrentlyEditing(testimonial.TId);
                            console.info(testimonial.TId);
                            handleEditDrawerOpen();
                          }}
                          color="secondary"
                          variant="contained"
                        >
                          Edit
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
     count={testimonials.length}
     page={page}
     onPageChange={handleChangePage}
     rowsPerPage={rowsPerPage}
     onRowsPerPageChange={handleChangeRowsPerPage}
    />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string
};

export default Results;
