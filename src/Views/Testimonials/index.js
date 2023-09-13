
import React, { useState,useEffect } from 'react';
import {
  Box,
  Container,
  Drawer,
  IconButton,
  useTheme
} from '@mui/material';
import Toolbar from './Toolbar';
//import ChevronLeftIcon from '@mui/material';
//import ChevronRightIcon from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Results from './Results';
import AddTestimonial from './AddTestimonials';
import EditTestimonials from "./EditTestimonials";
import axios from "axios";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import CircularProgress from '@mui/material/CircularProgress';


const drawerWidth = "80%";


const TestimonialsList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
 
 
  const [open, setOpen] = useState(false);
  const [testimonilInfo,setTestimonialInfo] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentlyEditing, setCurrentlyEditing] = useState('');

  const [loader,setLoader] = useState(false);
 

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleEditDrawerOpen = () => {
    setIsEditOpen(true);
  };

  const handleEditDrawerClose = () => {
    setIsEditOpen(false);
  };

  const getAllTestimonials = async () => {
   
    await axios
      .get('https://localhost:44312/api/Testimonials')
      .then(res => {
        setLoader(true)
        console.log(res.data.data);
        setTestimonialInfo(res.data.data);
        setLoader(false)
        })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(()=>{
    getAllTestimonials();
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
        {loader && <CircularProgress />}
          <Results testimonials={testimonilInfo}  handleEditDrawerOpen={handleEditDrawerOpen}
                  setCurrentlyEditing={setCurrentlyEditing}/>
     
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
        <AddTestimonial handleDrawerClose={handleDrawerClose} />
      </Drawer>

      <Drawer
         
          variant="persistent"
          anchor="right"
          open={isEditOpen}
         
        >
          <div>
            <IconButton onClick={handleEditDrawerClose}>
              {theme.direction === 'rtl' ? (
                <ArrowBackIosIcon />
              ) : (
                <ArrowForwardIosIcon />
              )}
            </IconButton>
          </div>
          {Boolean(isEditOpen && currentlyEditing !== '') && (
            <EditTestimonials
              handleEditDrawerClose={handleEditDrawerClose}
              currentTestimonialId={currentlyEditing}
              
            />
           
          )}
          
        </Drawer>
      </Container>

    
    </Box>
      </Box>
    </Box>
  );
};

export default TestimonialsList;
