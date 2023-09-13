
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
import AddPublication from "./AddPublication";
import Results from './Results';
import axios from "axios";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const drawerWidth = "80%";



const PublicationsList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
 
  const [publications, setPublications] = useState([]);
  const [open, setOpen] = useState(false);


  const getAllPublicationData = async () => {
    await axios
      .get('https://localhost:44312/api/Publication')
      .then(res => {
        console.log(res.data.data);
        setPublications(res.data.data);
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
    getAllPublicationData();
  }, []);

  return (
    <Box m="20px">
    <Header title="Publications" subtitle="Publications List" />
  
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
          <Results publications={publications} />
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
        <AddPublication handleDrawerClose={handleDrawerClose} />
      </Drawer>
      </Container>
      </Box>
      </Box>
      </Box>
  
  );
};

export default PublicationsList;
