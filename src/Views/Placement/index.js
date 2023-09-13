import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Container,
  Divider,
  Drawer,
  Grid,
  IconButton,
  makeStyles,
  TextField,
  useTheme
} from '@mui/material';

import Toolbar from './Toolbar';
import { useEffect } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddPlacement from './AddPlacement';
import PlacementReportCard from './PlacementReportCard';
import { useRef } from 'react';
import Header from "../../components/Header";
import { tokens } from "../../theme";
import axios from "axios";


const drawerWidth = '70%';



const Placement = ({ className, ...rest }) => {
 
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  const [placementData,setPlacementData] = useState([]);
  const [open, setOpen] = useState(false);
  const [placementOfficer, setPlacementOfficer] = useState({
    name: '',
    image: '',
    description: ''
  });

  const fileRef = useRef(null);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleImageChange = e => {
    fileRef.current.click();
  };

  const setOfficerData = async() =>{
    const payload = {
      Name : placementOfficer.name,
      Image : placementOfficer.image,
      Description : placementOfficer.description
    }
      await axios.post("https://localhost:44312/api/PlacementOfficer",payload)
      .then((res)=>{
          console.log(res.data)
      })
      .catch((error)=>{
        console.log(error)
      })
  }

  const getOfficerData = async() =>{
    await axios.get("https://localhost:44312/api/PlacementOfficer")
      .then((res)=>{
        
        let officerData = res.data.data
        console.log(officerData.length)
        for(let i = 0; i < officerData.length; i++){
          setPlacementOfficer({
            ...placementOfficer,
            name: officerData[i].Name,
            description: officerData[i].Description,
            image: officerData[i].Image
        });
      }
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  const getAllPlacementData = async () => {
    await axios
      .get('https://localhost:44312/api/Placement')
      .then(res => {
        console.log(res.data.data);
        setPlacementData(res.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllPlacementData();
    getOfficerData();
  }, []);

   
  return (
    <Box m="20px">
    <Header title="Placement" subtitle="Placement List" />
  
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
        <Card
         
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            padding:'20px',
            marginTop:"20px"
          }}
          {...rest}
        >
          <CardHeader title="Placement Officer" />
          <Divider />
          <Avatar alt={placementOfficer.name} src={placementOfficer.image} />
          <Button
            color="primary"
            size="large"
            variant="contained"
            onClick={handleImageChange}
          >
            Change Image
          </Button>
          <input
            type="file"
            name="image"
            id="file"
            hidden
            ref={fileRef}
            onChange={(e)=>{
              if (e.target.files && e.target.files[0]) {
                let reader = new FileReader();
                reader.onload = e => {
                 setPlacementOfficer({
                    ...placementOfficer,
                    image: e.target.result
                  });
                };
                reader.readAsDataURL(e.target.files[0]);
              }
            }}
           
          />
          <TextField
            fullWidth
            label="Name"
            margin="normal"
            name="name"
            onChange={e => {
              setPlacementOfficer({
                ...placementOfficer,
                name: e.target.value
              });
            }}
            value={placementOfficer.name}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Description"
            margin="normal"
            name="description"
            onChange={e => {
              setPlacementOfficer({
                ...placementOfficer,
                description: e.target.value
              });
            }}
            value={placementOfficer.description}
            multiline
            rows={5}
            variant="outlined"
          />
          <Box my={2}>
            <Button
              color="primary"
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              onClick={setOfficerData}
            >
              Set
            </Button>
          </Box>
        </Card>
        <Box mt={3}>
        <Grid container spacing={3}>
         {placementData.map((d, i) => (
            <Grid item key={d.PId} lg={4} md={6} xs={12}>
                <PlacementReportCard placement={d} />
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
          <AddPlacement handleDrawerClose={handleDrawerClose} />
        </Drawer>
      </Container>
      </Box>
      </Box>
      </Box>
   
  );
};

export default Placement;
