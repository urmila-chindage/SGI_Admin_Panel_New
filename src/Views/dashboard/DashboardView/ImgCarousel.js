import {
    Avatar,
    Box,
    Button,
    Card,
    CardHeader,
    Chip,
    Container,
    Divider,
    Fab,
    Grid,
    IconButton,
    makeStyles,
    TextField
  } from '@mui/material';
  import React from 'react';
  import { useState } from 'react';

  import { useEffect } from 'react';


  
  
  
  const ImgCarousel = ({...rest }) => {
   
  
    const [data, setData] = useState([]);
  
    const handleButtonClick = () => {
      let ele = document.getElementById('gallery-file');
      ele.click();
    };
  
   
  
   
  
    
    return (
      <Card {...rest}>
        <CardHeader title="Image Gallery" />
        <Divider />
        <Box m={3}>
          
            <Chip
              color="primary"
              avatar={<Avatar alt="Natacha"  src={`../../assets/profileimage.jpg`}/>}
              label="Avatar image"
             
              
            />
         
        </Box>
        <TextField
          fullWidth
          label="Students This Year"
          margin="normal"
          name="this year"
          type="file"
          id="gallery-file"
         
          style={{ display: 'none' }}
        />
        <Box my={2} bottom="0" width="100%" position="relative">
          <Button
            color="primary"
            fullWidth
            size="large"
            variant="contained"
          
          >
           
          </Button>
        </Box>
      </Card>
    );
  };
  
  export default ImgCarousel;
  