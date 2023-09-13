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
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import Toolbar from './Toolbar';
import { useEffect } from 'react';
//import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
//import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AchivementCard from './AchivementCard';
import AddAchivement from './AddAchivement';
import axios from "axios";
import { tokens } from "../../../theme";
import CircularProgress from '@mui/material/CircularProgress';
import Header from "../../../components/Header";

const drawerWidth = '80%';



const AchivementsListView = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
 

  const [achivements, setAchivements] = useState([]);
  const [open, setOpen] = useState(false);
  const [loader,setLoader] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const getAllAcheivementData = async () => {
    setLoader(true);
    await axios
      .get('https://localhost:44312/api/Achivement')
      .then(res => {
       
        console.log(res.data.data);
        setAchivements(res.data.data);
        setLoader(false);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(()=>{
    getAllAcheivementData();
  },[])


 

  return (
    <Box m="20px">
    <Header title="Achivements" subtitle="Achivements List" />
  
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
            {loader ? <CircularProgress/> :
            achivements.map((achivement) => (
              <AchivementCard achivement={achivement} key={achivement.AId} style={{margin:'3px'}}/>
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
            {theme.direction === 'rtl' ? <ArrowBackIosIcon /> : <ArrowForwardIosIcon />}
          </IconButton>
        </div>
          {/* <AddUpdate handleDrawerClose={handleDrawerClose} /> */}
          <AddAchivement handleDrawerClose={handleDrawerClose} />
        </Drawer>
      </Container>
      </Box>
      </Box>
      </Box>
  
  );
};

export default AchivementsListView;
