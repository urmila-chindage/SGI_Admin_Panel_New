import React from 'react';

import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  makeStyles,
  FormControl,
  MenuItem,
  InputLabel,
  Select
} from '@mui/material';

import { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';




const AddPublication = ({handleDrawerClose}) => {

   
    const navigate = useNavigate();

    return (
       
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              Department: '',
              PYear: '',
              PName: '',
              Pplatform: '',
              PTitle: '',
              Publishedby: '',
              PCategory: ''
            }}

            onSubmit={async (values, { resetForm }) => {
              await axios
              .post('https://localhost:44312/api/Publication', values)
                .then(res => {
                  console.log(res.data);
                  console.log(values);
                  resetForm();
                  handleDrawerClose();
                 
                  navigate(0);
                })
                .catch(error => {
                  console.log(error);
                })
            }}
          >
            {({
              errors,
              handleBlur,
              handleSubmit,
              handleChange,
              isSubmitting,
              values,
              resetForm,
              touched
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Add new Publication
                  </Typography>
                </Box>
                <TextField
                  fullWidth
                  label="Title of Publication"
                  margin="normal"
                  name="PTitle"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.PTitle}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Name Of Publisher(eg. john, doe)"
                  margin="normal"
                  name="PName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.PName}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Year Of Publication(YYYY)"
                  margin="normal"
                  name="PYear"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.PYear}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Platform Name(Journal)"
                  margin="normal"
                  name="PplatformName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.PplatformName}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Category (eg. book | paper)"
                  margin="normal"
                  name="Pcategory"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.Pcategory}
                  variant="outlined"
                />
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-label">Department</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="Department"
                    onChange={handleChange}
                    value={values.Department}
                  >
                    <MenuItem value="Computer Science">Computer Science</MenuItem>
                    <MenuItem value="Mechanical">Mechanical</MenuItem>
                    <MenuItem value="E & TC">E &amp; TC</MenuItem>
                    <MenuItem value="Civil">Civil</MenuItem>
                    <MenuItem value="Electrical">Electrical</MenuItem>
                    <MenuItem value="Basic Science & Humanities">Basic Science &amp; Humanities</MenuItem>
                    <MenuItem value="Library">Library</MenuItem>
                    <MenuItem value="Administrative">Administrative</MenuItem>
                  </Select>
                </FormControl>
                <FormControl  variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-label">Published By</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="Publishedby"
                    onChange={handleChange}
                    value={values.Publishedby}
                  >
                    <MenuItem value="Faculty">Faculty</MenuItem>
                    <MenuItem value="Student">Student</MenuItem>
                  </Select>
                </FormControl>
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Add
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
   
    );
}

export default AddPublication;
