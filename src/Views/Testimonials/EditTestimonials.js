import React ,{useEffect} from 'react';
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
import axios from "axios";
import "../Testimonials/Testimonials.css";
import Header from "../../components/Header";
import { tokens } from "../../theme";




const EditTestimonials = ({ handleEditDrawerClose,currentTestimonialId }) => {
 
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

 const [avatarPreview, setAvatarPreview] = useState("");

 
 const [testimonials, setTestimonials] = useState({
    Name:"",
    Desc:"",
    Image:""
  });

 const getTestimonialRecord = async () =>{
    await axios
    .get(`https://localhost:44312/api/Testimonials/CounterId?TId=${currentTestimonialId}`)
    .then(res => {
      console.log('Record is edited', res.data.data);
      console.log(currentTestimonialId)
      setTestimonials({
        ...testimonials,
        Name: res.data.data.Name,
        Desc: res.data.data.Desc,
        Image: res.data.data.Image,
        
      });
    })
    .catch(error => {
      if(!error){
        handleEditDrawerClose();
      }
     
      console.log(error);
    });
  }

  useEffect(()=>{
    getTestimonialRecord();
    
  },[])

 return (
  <Box m="20px">
  <Header title="Calendar" subtitle="Full Calendar Interactive Page" />

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
           
           
            onSubmit={async (testimonials,{resetForm}) => {
             let testimonialsData = {
                 Name : testimonials.Name,
                 Desc : testimonials.Desc,
                 Image : testimonials.Image
             }
              await axios.put(`https://localhost:44312/api/Testimonials/${currentTestimonialId}`,testimonialsData)
              .then((res)=>{
                console.log(res);
                console.log(testimonials);
               
              })
              .catch((error)=>{
                console.log(error);
              })
            }}
          >
            {({ errors, handleBlur, handleSubmit, isSubmitting,touched,handleChange,setFieldValue }) => (
              <form onSubmit={handleSubmit}>
              
                <Box mb={3}>
                  <Typography color="textPrimary" variant="h2">
                    Edit Testimonial
                  </Typography>
                </Box>

              
                <TextField
                  type="string"
                  fullWidth
                  label="Name"
                  margin="normal"
                  name="Name"
                  onBlur={handleBlur}
                  onChange={e => {
                    setTestimonials({ ...testimonials, Name: e.target.value });
                  }}
                  value={testimonials.Name}
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
                  onChange={e => {
                    setTestimonials({ ...testimonials, Desc: e.target.value });
                  }}
                  value={testimonials.Desc}
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
              
              <img src={testimonials.Image} alt="Testimonials" className='profileImage'/>
                 
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

export default EditTestimonials;
