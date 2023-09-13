import React from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  makeStyles,
  useTheme
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "../Testimonials/Testimonials.css";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";




const AddTestimonial = ({ handleDrawerClose }) => {
 
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

 const [avatarPreview, setAvatarPreview] = useState("");
 const navigate = useNavigate();
 const [loader,setLoader] = useState(false);

 return (
  
  <Box m="20px">
 

  <Box display="flex" justifyContent="space-between">
    {/* CALENDAR SIDEBAR */}
    <Box
      flex="1 1 20%"
      backgroundColor={colors.primary[400]}
      p="15px"
      borderRadius="4px"
    >
        <Container maxWidth="sm">
      
          <Formik
            initialValues={{
              Name: "",
              Desc: "",
              Image: ""
            }}
            validationSchema={yup.object().shape({
              Name: yup
              .string()
              .required('Your Name is Required!'),

               Desc: yup
              .string()
              .required('Description is Required!')
              .min(12, 'Your Description Needs To Be Valid'),

              Image: yup
              .mixed()
              .required('Image is Required!'),
            })}
           
            onSubmit={async (values,{resetForm }) => {
             setLoader(true);
              await axios.post("https://localhost:44312/api/Testimonials",values)
              .then((res)=>{
                console.log(res.data);
                console.log(values);
                resetForm();
                handleDrawerClose();
                toast.success("Testimonial Data is Added");
                navigate(0);
              })
              .catch((error)=>{
                console.log(error)
              })
              setLoader(false)
            }}
          >
            {({ errors, handleBlur, handleSubmit, isSubmitting,touched,handleChange,setFieldValue,values }) => (
              <form onSubmit={handleSubmit}>
                <ToastContainer />
               
                <Box mb={3}>
                  <Typography color="textPrimary" variant="h2">
                    Add new Testimonial
                  </Typography>
                </Box>

              
                <TextField
                  type="string"
                  fullWidth
                  label="Name"
                  margin="normal"
                  name="Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.Name}
                  variant="outlined"
                  error={Boolean(touched.Name && errors.Name)}
                  helperText={touched.Name && errors.Name}
                />
               
                <TextField
                 fullWidth
                 type="string"
                  label="Message"
                  margin="normal"
                  name="Desc"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.Desc}
                  variant="outlined"
                  multiline
                  rows={6}
                  error={Boolean(touched.Desc && errors.Desc)}
                  helperText={touched.Desc && errors.Desc}
                />

                <Typography color="textPrimary" variant="h4">
                  Image:
                </Typography>
                
                <TextField
                   type="file"
                   name="Image"
                   accept="image/*"
                   onChange={(e) => {
                    const fileReader = new FileReader();
                    fileReader.onload = () => {
                      if (fileReader.readyState === 2) {
                        setFieldValue('Image', fileReader.result);
                        setAvatarPreview(fileReader.result);
                      }
                    };
                    fileReader.readAsDataURL(e.target.files[0]);
                  }}
                  error={Boolean(touched.Image && errors.Image)}
                  helperText={touched.Image && errors.Image}
                 />
              
                 <img className="profileImage" src={avatarPreview} alt=""/>
                 
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
      </Box>
   </Box>
  );
};

export default AddTestimonial;
