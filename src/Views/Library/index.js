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
import Results from './Results';
import AddLibraryData from './AddLIbraryData';
import axios from "axios";
import { tokens } from "../../theme";
import Header from "../../components/Header"

const drawerWidth = '80%';


const Library = () => {
 
  const [open, setOpen] = useState(false);
  const [reports, setReports] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [bookbank, setBookbank] = useState([]);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

 const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const getAllLibraryData = async () => {
    await axios
      .get('https://localhost:44312/api/Library')
      .then(res => {
        console.log(res.data.data);
        let categoryData = res.data.data;
        let reportData = [];
        let achievementData = [];
        let bookbankData = [];
        categoryData.map((item,i)=>{
          if(item.Category==="REPORT"){
            reportData.push(item);
          }
          if(item.Category==="ACHIEVEMENT"){
            achievementData.push(item);
          }
          if(item.Category==="BOOKBANK"){
            bookbankData.push(item);
          }
        })
        setReports(reportData);
        setAchievements(achievementData);
        setBookbank(bookbankData);
        })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(()=>{
    getAllLibraryData();
  },[])

  return (
   <Box m="20px">
  <Header title="Testiminials" subtitle="Testimonials List" />

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
          <Results library={reports} style={{marginBottom:"10px"}}/>
          <Results library={achievements} style={{marginBottom:"10px"}}/>
          <Results library={bookbank} style={{marginBottom:"10px"}}/> 
        </Box>
        <Drawer
        
          variant="persistent"
          anchor="right"
          open={open}
          
        >
          <div>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? (
                <ArrowBackIosIcon />
              ) : (
                <ArrowForwardIosIcon />
              )}
            </IconButton>
          </div>
          <AddLibraryData handleDrawerClose={handleDrawerClose} />
         </Drawer>
      </Container>
      </Box>
      </Box>
      </Box>
  
  );
};

export default Library;
