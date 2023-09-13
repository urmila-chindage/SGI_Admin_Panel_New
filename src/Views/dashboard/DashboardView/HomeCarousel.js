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
  Typography,
  Grid,
  IconButton,
  makeStyles,
  TextField
} from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useEffect, useRef } from 'react';

import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import axios from 'axios';



const CarouselImages = ({ ...rest }) => {
  

  const [carousel, setCarousel] = useState([]);
  const [profile, setProfile] = useState('');

  const imageRef = useRef(null);

  const navigate = useNavigate();

 

  const handleImageChange = e => {
    imageRef.current.click();
  };

  const uploadImages = e => {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = e => {
        setProfile(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const getCarouselImages = async () => {
    await axios
      .get('https://localhost:44312/api/SliderImage/GetAllImages')
      .then(res => {
        console.log(res.data.data);
        setCarousel(res.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
  const submitImage =  () => {
    const payload = {
      Images: profile
    };
     axios
      .post(
        'https://localhost:44312/api/SliderImage/InsertSliderImage',
        payload
      )
      .then(res => {
        console.log(res);
        navigate('/');
      
       
      })
      .catch(error => {
        console.log(error);
      });
  };

  const deleteCarouselImage =  (id) => {
   
     axios
      .delete(`https://localhost:44312/api/SliderImage/DeleteImage?SIId=${id}`)
      .then(res => {
        console.log('Record is deleted', res);
        navigate('/');
    
       
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getCarouselImages();
  }, []);

  return (
    <Card {...rest}>
      
      <CardHeader title="Carousel Images" />
      <Divider />
      <Box m={3}>
        {carousel.map((carouselImage, index) => (
          <Chip
            color="primary"
            avatar={<Avatar alt="Carousel Images" src={carouselImage.Images} />}
            label={index + 1}
            target={carouselImage.Images}
            onClick={() => {
              window.open(carouselImage.Images, 'width=200, height=200');
            }}
            onDelete={() => {
              deleteCarouselImage(carouselImage.SIId);
            }}
            key={index}
            style={{margin:"5px"}}
          />
        ))}
      </Box>

      <input
        type="file"
        name="Image"
        id="image"
        hidden
        ref={imageRef}
        onChange={uploadImages}
      />

      <Box m={1} display="flex" justifyContent="center" alignItems="center">
        <Button
          color="primary"
          size="large"
          type="submit"
          variant="contained"
          onClick={handleImageChange}
        >
         
        </Button>
        <img src={profile}  alt="Carousel Image" style={{width:"60px",height:"60px",border:"1px solid #000",marginLeft:"5px"}}/>
      </Box>

     

      <Box my={2} bottom="0" width="100%" position="relative">
        <Button
          color="primary"
          fullWidth
          size="large"
          variant="contained"
          onClick={() => submitImage()}
        >
          Set Image
        </Button>
      </Box>
    </Card>
  );
};

export default CarouselImages;
