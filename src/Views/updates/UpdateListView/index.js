import React, { useState } from 'react';
import {
  Box,
  Container,
  Drawer,
  IconButton,
  makeStyles,
  useTheme
} from '@mui/material';
import Results from './Results';
import Toolbar from './Toolbar';
import { useEffect } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddUpdate from './AddUpdate';
import axios from "axios";
import Header from "../../../components/Header";
import { tokens } from "../../../theme";

const drawerWidth = "80%";


const UpdateListView = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [updates, setUpdates] = useState([]);
  const [open, setOpen] = useState(false);

  const getAllUpdateData = async () => {
    await axios
      .get('https://localhost:44312/api/LatestUpdate/GetAllLUpdates')
      .then(res => {
        console.log(res.data.data);
        setUpdates(res.data.data);
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
    getAllUpdateData();
  }, []);

  return (
    <Box m="20px">
    <Header title="Updates" subtitle="Update List" />
  
    <Box display="flex" justifyContent="space-between">
      {/* CALENDAR SIDEBAR */}
      <Box
        flex="1 1 20%"
        backgroundColor={colors.primary[400]}
        p="15px"
        borderRadius="4px"
      >
      <Container maxWidth={false}>
        <Toolbar openDrawer={handleDrawerOpen}/>
        <Box mt={3}>
          <Results updates={updates} />
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
        <AddUpdate handleDrawerClose={handleDrawerClose} />
       
      </Drawer>
      </Container>
   </Box>
   </Box>
   </Box>
  );
};

export default UpdateListView;
