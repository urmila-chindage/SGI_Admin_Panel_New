import React from 'react';
import { Formik } from 'formik';
import { v4 as uuid } from 'uuid';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  makeStyles,
  Switch
} from '@mui/material';

import { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';





const AddImpLink = ({ handleDrawerClose }) => {
 
  const navigate = useNavigate();

  const [data, setData] = useState({
    content: '',
    file: null,
    isFiles: true
  });
  
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
              content: '',
              file: null,
            }}
            onSubmit={async () => {
             const payload = {
              HtmlContent : data.content,
              File : data.file,
              IsFile : data.isFiles
             }
             await axios.post("https://localhost:44312/api/ImportantLink",payload)
             .then((res)=>{
                  console.log(res.data)
                  handleDrawerClose();
                
                  navigate(0);
             })
             .catch((error)=>{
                console.log(error);
             })
            }}
          >
            {({ errors, handleBlur, handleSubmit, isSubmitting, touched }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3} spacing={2}>
                  <Typography color="textPrimary" variant="h2">
                    Add Important Link
                  </Typography>
                </Box>
                <TextField
                  fullWidth
                  label="HTML content (dont add anchor tag if file is to be uploaded)"
                  margin="normal"
                  name="content"
                  onBlur={handleBlur}
                  onChange={e => {
                    setData({ ...data, content: e.target.value });
                  }}
                  value={data.content}
                  variant="outlined"
                  multiline
                  rows={5}
                />
                <Switch
                  checked={data.isFiles}
                  onChange={e => {
                    setData({ ...data, isFiles: e.target.checked });
                  }}
                  color="primary"
                  name="checkedB"
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />

                {data.isFiles && (
                  <>
                    <Typography color="textPrimary" variant="h4">
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
                            setData({...data,file:fileReader.result})
                          }
                        };
                        fileReader.readAsDataURL(e.target.files[0]);
                      }}
                      type="file"
                      variant="outlined"
                    />
                  </>
                )}

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
};

export default AddImpLink;
