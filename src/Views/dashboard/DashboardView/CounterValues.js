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
import clsx from 'clsx';
import axios from "axios";

const CounterValues = ({...rest }) => {
  

const [counterValues, setCounterValues] = useState({
    TotalStudent: 0,
    Course: 0,
    Teacher: 0
  });

  

   const getCounterValues = async () =>{
    await axios.get("https://localhost:44312/api/Counter")
    .then((res)=>{
      let counterData = res.data.data;
      console.log(counterData[counterData.length-1])
      setCounterValues(counterData[counterData.length-1]);
      
    })
    .catch((error)=>{
      console.log(error);
    })
   }

  const counterData = async() =>{
    const payload = {
      TotalStudent : counterValues.TotalStudent,
      Course : counterValues.Course,
      Teacher : counterValues.Teacher
    }
    await axios.post("https://localhost:44312/api/Counter",payload)
    .then((res)=>{
      console.log(res.data);
     
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  useEffect(()=>{
    getCounterValues();
  },[])

  return (
    <Card {...rest}>
      <CardHeader title="Counter Values" />
      <Divider />
      <TextField
        fullWidth
        label="Total Students"
        margin="normal"
        name="TotalStudent"
        onChange={e => {
          setCounterValues({ ...counterValues, TotalStudent: e.target.value });
        }}
        value={counterValues.TotalStudent}
        variant="outlined"
      />
      <TextField
        fullWidth
        label="Courses"
        margin="normal"
        name="Course"
        onChange={e => {
          setCounterValues({ ...counterValues, Course: e.target.value });
        }}
        value={counterValues.Course}
        variant="outlined"
      />
      <TextField
        fullWidth
        label="Certified Teachers"
        margin="normal"
        name="Teacher"
        onChange={e => {
          setCounterValues({ ...counterValues, Teacher: e.target.value });
        }}
        value={counterValues.Teacher}
        variant="outlined"
      />
      <Box my={2}>
        <Button
          color="primary"
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          onClick={counterData}
        >
          Set
        </Button>
      </Box>
    </Card>
  );
};

export default CounterValues;
