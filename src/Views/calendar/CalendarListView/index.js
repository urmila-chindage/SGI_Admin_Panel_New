
import React, { useState } from 'react';
import {
  Box,
  Container,
  Drawer,
  IconButton,
  makeStyles,
  useTheme
} from '@mui/material';
import Toolbar from './Toolbar';
import { useEffect } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddCalendar from './AddCalendar';
import Results from './Results';
import axios from "axios";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";

const drawerWidth = "80%";


const CalendarList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [open, setOpen] = useState(false);
  const [calendars, setCalendars] = useState([]);


  const getAllCalendarsData = async () => {
    await axios
      .get('https://localhost:44312/api/Calendar')
      .then(res => {
        console.log(res.data.data);
        setCalendars(res.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

 

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getAllCalendarsData();
  }, []);

  return (
    <Box m="20px">
    <Header title="Academic Calender" subtitle="Academic Calender List" />
  
    <Box display="flex" justifyContent="space-between">
      {/* CALENDAR SIDEBAR */}
      <Box
        flex="1 1 20%"
        backgroundColor={colors.primary[400]}
        p="15px"
        borderRadius="4px"
      >
      <Container maxWidth={false}>
        <Toolbar handleDrawerOpen={handleDrawerOpen} />
        <Box mt={3}>
          <Results calendars={calendars} />
        </Box>
        <Drawer
    
        variant="persistent"
        anchor="right"
        open={open}
       
      >
        <div>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ArrowBackIosIcon /> : <ArrowForwardIosIcon />}
          </IconButton>
        </div>
        <AddCalendar handleDrawerClose={handleDrawerClose} />
        
      </Drawer>
      </Container>
      </Box>
      </Box>
      </Box>
   
  );
};

export default CalendarList;
