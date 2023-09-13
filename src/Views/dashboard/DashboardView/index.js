import React from 'react';
import { Container, Grid, Box,Button,useTheme } from '@mui/material';
import Header from "../../../components/Header";
import { tokens } from "../../../theme";
//import Page from 'src/components/Page';
import Subscribers from './Subscribers';
//import TrafficByDevice from './TrafficByDevice';
import LatestContacts from './LatestContacts';
import CounterValues from './CounterValues';
import HomeCarousel from './HomeCarousel';
import VideoCarousel from './VideoCarousel';
import ImgCarousel from './ImgCarousel';
import Headlines from './Headlines';
import SubscribersList from './SubscribersList';
import Modal from './Modal';



const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.redAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
           
          </Button>
        </Box>
      </Box>

      <Container maxWidth={false}>
        <Grid container spacing={3}>
        <Grid item lg={6} md={6} xl={4} xs={12}>
            <CounterValues />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <Modal />
          </Grid>
        
        <Grid item lg={4} md={6} xl={3} xs={12}>
            <HomeCarousel />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <Headlines />
          </Grid>
         
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Subscribers />
          </Grid>
         
         
          <Grid item lg={6} md={6} xl={4} xs={12}>
            <LatestContacts />
          </Grid>
         
          <Grid item lg={6} md={6} xl={4} xs={12}>
            <SubscribersList />
          </Grid>

         
         
           <Grid item lg={6} md={6} xl={6} xs={6}>
            <ImgCarousel />
  </Grid> 
         
         
         
        </Grid>
      </Container>
      </Box>
   
  );
};

export default Dashboard;
