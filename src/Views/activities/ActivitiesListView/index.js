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
import ActivityCard from './ActivityCard';
import AddActivity from './AddActivities';
import axios from "axios";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";

const drawerWidth = '80%';


const ActivitiesListView = () => {
  
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [activityData,setActivityData] = useState([]);
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const getAllActivityData = async () => {
    await axios
      .get('https://localhost:44312/api/Activity')
      .then(res => {
        console.log(res.data.data);
        setActivityData(res.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllActivityData();
  }, []);

 return (
  <Box m="20px">
    <Header title="Activity" subtitle="Activity List" />
  
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
         <Grid container spacing={3}>
         {activityData.map((d, i) => (
            <Grid item key={d.ActId} lg={4} md={6} xs={12}>
                <ActivityCard activity={d} />
            </Grid>
          ))}
          </Grid>
          
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
          <AddActivity handleDrawerClose={handleDrawerClose} />
        </Drawer>
      </Container>
      </Box>
      </Box>
      </Box>
  
  );
};

export default ActivitiesListView;
