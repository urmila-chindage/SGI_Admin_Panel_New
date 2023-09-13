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
import AddResultnLetterData from './AddResultnLetterData';
import axios from "axios";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const drawerWidth = '80%';



const ResultnLetter = () => {
 
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState([]);
  const [letter, setLetter] = useState([]);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const getAllResultData = async () => {
    await axios
      .get('https://localhost:44312/api/ResultnLetter')
      .then(res => {
        console.log(res.data.data);
        let categoryData = res.data.data;
        let resultData = [];
        let letterData = [];
       
        categoryData.map((item,i)=>{
          if(item.Category==="Result"){
            resultData.push(item);
          }
          if(item.Category==="Letter"){
            letterData.push(item);
          }
          
        })
        setResults(resultData);
        setLetter(letterData);
        
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllResultData();
  }, []);

  return (
  <Box m="20px">
    <Header title="Result And Letter" subtitle="Result and Letter List" />
  
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
          <Results resultnLetter={results} style={{marginBottom:"10px"}}/>
          <Results resultnLetter={letter} />
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
          <AddResultnLetterData handleDrawerClose={handleDrawerClose} />
         
        </Drawer>
      </Container>
      </Box>
      </Box>
      </Box>
    
  );
};

export default ResultnLetter;
