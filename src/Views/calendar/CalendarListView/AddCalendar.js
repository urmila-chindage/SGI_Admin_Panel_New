import React from 'react';
import { v4 as uuid } from 'uuid';
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





const AddCalendar = ({handleDrawerClose}) => {

   
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
                department: '',
                year: '',
                semister: '',
                level: '',
                file: File,
            }}

            onSubmit={async (values, { resetForm }) => {
              await axios
              .post('https://localhost:44312/api/Calendar', values)
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
              isSubmitting,
              handleChange,
              touched,
              values,
              setFieldValue
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Add new Calendar
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.year && errors.year)}
                  fullWidth
                  helperText={touched.year && errors.year}
                  label="Year (YYYY-YY)"
                  margin="normal"
                  name="year"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.year}
                  variant="outlined"
                />
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-label">Level</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="level"
                    onChange={handleChange}
                    value={values.level}
                  >
                    <MenuItem value="MSBTE">MSBTE</MenuItem>
                    <MenuItem value="Institute">Institute</MenuItem>
                    <MenuItem value="Department">Department</MenuItem>
                  </Select>
                </FormControl>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-label">Department</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="department"
                    onChange={handleChange}
                    value={values.department}
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
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-label">Sem</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="semister"
                    onChange={handleChange}
                    value={values.semister}
                  >
                    <MenuItem value="Odd">Odd</MenuItem>
                    <MenuItem value="Even">Even</MenuItem>
                  </Select>
                </FormControl>
                <Typography
                    color="textPrimary"
                    variant="h4"
                >
                    File:
                </Typography>
                <TextField
                  error={Boolean(touched.file && errors.file)}
                  fullWidth
                  helperText={touched.file && errors.file}
                  margin="normal"
                  name="file"
                  onBlur={handleBlur}
                  onChange={e => {
                    const fileReader = new FileReader();
                    fileReader.onload = () => {
                      if (fileReader.readyState === 2) {
                        setFieldValue('file', fileReader.result);
                      }
                    };
                    fileReader.readAsDataURL(e.target.files[0]);
                  }}
                  type="file"
                  variant="outlined"
                />
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

export default AddCalendar;
