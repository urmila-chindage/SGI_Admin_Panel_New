import {
    Box,
    Button,
    Card,
    CardHeader,
    Divider,
    makeStyles,
    TextField
  } from '@mui/material';
  import React from 'react';
  import { useState,useEffect } from 'react';
  import { useNavigate } from 'react-router-dom';
  import axios from "axios";
 
  
  const Headline = ({...rest }) => {
    
  
    const [headlineInfo, setHeadlineInfo] = useState({
      headline: ''
    });
    const navigate = useNavigate();
    

    

    const getHeadline = async () =>{
        await axios.get("https://localhost:44312/api/Marquee")
        .then((res)=>{
          console.log(res.data.data);
          let headlineData = res.data.data;
          setHeadlineInfo(headlineData[headlineData.length-1]);
         
        })
        .catch((error)=>{
          console.log(error)
        })
    }

    const setHeadline = async() =>{
      const payload = {
        Data : headlineInfo.headline
      }
      await axios.post("https://localhost:44312/api/Marquee",payload)
      .then((res)=>{
        console.log(res.data)
        navigate('/');
        //NotificationManager.success('HeadLine Data is Set!', 'Successful!', 2000);
      })
      .catch((error)=>{
        console.log(error);
      })
    }

    useEffect(()=>{
      getHeadline();
    },[])
  
    return (
      <Card  {...rest}>
        <CardHeader title="Marquee Headline" />
        <Divider />
        <TextField
          fullWidth
          label="Enter headline"
          margin="normal"
          name="headline"
          onChange={e => {
            setHeadlineInfo({ ...headlineInfo, headline: e.target.value });
          }}
          value={headlineInfo.headline}
          variant="outlined"
          multiline={true}
          rows={7}
        />
        <Box my={2}>
          <Button
            color="primary"
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            onClick={()=>setHeadline()}
          >
            Set
          </Button>
        </Box>
      </Card>
    );
  };
  
  export default Headline;
  