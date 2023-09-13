import React, { useState } from 'react';
import {
  Box,
  Container,
  Drawer,
  IconButton,
  makeStyles,
  Typography,
  useTheme
} from '@mui/material';

import Toolbar from './Toolbar';

import { useEffect } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import AddNews from './AddNews';
import NewsResults from './NewsResult';

import AddImpLink from './AddImpLink';
import LinksResult from './LinksResult';
import axios from "axios";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const drawerWidth = '80%';



const NewsList = () => {
  
  const [open, setOpen] = useState(false);
  const [isLinksOpen, setIsLInksOpen] = useState(false);
  const [news, setNews] = useState([]);
  const [links, setLinks] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

 const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleImpLinksDrawerOpen = () => {
    setIsLInksOpen(true);
  };

  const handleImpLinksDrawerClose = () => {
    setIsLInksOpen(false);
  };

  const getAllNewsData = async () => {
    await axios
      .get('https://localhost:44312/api/News')
      .then(res => {
        console.log(res.data.data);
        setNews(res.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const getAllLinksData = async () => {
    await axios
      .get('https://localhost:44312/api/ImportantLink')
      .then(res => {
        console.log(res.data.data);
        setLinks(res.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(()=>{
    getAllNewsData();
    getAllLinksData();
  },[])
 

  return (
    <Box m="20px">
    <Header title="News Section" subtitle="News List" />
  
    <Box display="flex" justifyContent="space-between">
      {/* CALENDAR SIDEBAR */}
      <Box
        flex="1 1 20%"
        backgroundColor={colors.primary[400]}
        p="15px"
        borderRadius="4px"
      >
      <Container maxWidth={false}>
        <Toolbar
          handleDrawerOpen={handleDrawerOpen}
          handleImpLinksOpen={handleImpLinksDrawerOpen}
        />
        <Box mt={3} mb={3}>
          <Typography color="textPrimary" variant="h2">
            News
          </Typography>
          <NewsResults allNews={news} mt={3}/>
        </Box>
        <Box mt={3}>
          <Typography color="textPrimary" variant="h2">
            Important Links
          </Typography>
          <LinksResult importantLinks={links} />
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
          <AddNews handleDrawerClose={handleDrawerClose} />
        </Drawer>
        <Drawer
         
          variant="persistent"
          anchor="right"
          open={isLinksOpen}
         
        >
          <div>
            <IconButton onClick={handleImpLinksDrawerClose}>
              {theme.direction === 'rtl' ? (
                <ArrowBackIosIcon />
              ) : (
                <ArrowForwardIosIcon />
              )}
            </IconButton>
          </div>
          <AddImpLink handleDrawerClose={handleImpLinksDrawerClose} />
        </Drawer>
      </Container>
      </Box>
      </Box>
      </Box>
   
  );
};

export default NewsList;
