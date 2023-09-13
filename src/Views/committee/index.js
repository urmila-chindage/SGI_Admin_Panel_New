import React, { useState } from 'react';
import {
  Box,
  Container,
  Drawer,
  Grid,
  IconButton,
  makeStyles,
  useTheme
} from '@mui/material';
import Toolbar from './Toolbar';

import { useEffect } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddCommittee from './AddCommittee';
import Results from './Results';
import Header from "../../components/Header";
import { tokens } from "../../theme";


const drawerWidth = "80%";


const Committee = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
 
  const [committees, setcommittees] = useState([]);
  const [open, setOpen] = useState(false);

  

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

 

  return (
    <Box m="20px">
  <Header title="Committee" subtitle="Committee Members List" />

  <Box display="flex" justifyContent="space-between">
    {/* CALENDAR SIDEBAR */}
    <Box
      flex="1 1 20%"
      backgroundColor={colors.primary[400]}
      p="15px"
      borderRadius="4px"
    >
      <Container maxWidth={false}>
        <Toolbar handleDrawerOpen={handleDrawerOpen}/>
        <Box mt={3}>
          <Results committees={committees} />
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
        {/* <AddAchivement handleDrawerClose={handleDrawerClose} /> */}
        <AddCommittee handleDrawerClose={handleDrawerClose} />
      </Drawer>
      </Container>
      </Box>
      </Box>
      </Box>
  
  );
};

export default Committee;
