import React, { useState,useEffect,useRef } from 'react';
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
import StaffCard from './StaffCard';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddStaff from './AddStaff';
import EditStaff from './EditStaff';
import axios from "axios";
import Header from "../../../components/Header";
import { tokens } from "../../../theme";

const drawerWidth = '80%';



const StaffList = () => {
 
  const [staffMembers, setStaffMembers] = useState([]);
  const [open, setOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentlyEditing, setCurrentlyEditing] = useState('');

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const fileRef = useRef(null);

  const getAllStaffMembers = async () => {
    await axios
      .get('https://localhost:44312/api/StaffData')
      .then(res => {
        console.log(res.data.data);
        setStaffMembers(res.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(()=>{
    getAllStaffMembers();
  },[])
 

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



  return (
    <Box m="20px">
  <Header title="Staff" subtitle="Staff List" />

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
           
          {staffMembers.map(staff => (
              <Grid item key={staff.StaffId} lg={4} md={6} xs={12}>
                <StaffCard
                 
                  staff={staff}
                  handleEditDrawerOpen={handleEditDrawerOpen}
                  setCurrentlyEditing={setCurrentlyEditing}
                />
              </Grid>
            ))}
            
          </Grid>
        </Box>
        <Box mt={3} display="flex" justifyContent="center"></Box>
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
          <AddStaff handleDrawerClose={handleDrawerClose} />
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
            <EditStaff
              handleEditDrawerClose={handleEditDrawerClose}
              currentStaffId={currentlyEditing}
              
            />
           
          )}
          
        </Drawer>
      </Container>
      </Box>
      </Box>
      </Box>
   
  );
};

export default StaffList;
