import React from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles,
  Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import GetAppIcon from '@mui/icons-material/GetApp';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';




const PlacementReportCard = ({ placement, ...rest }) => {
  const navigate = useNavigate();

  const deletePlacementData = async id => {
    await axios
      .delete(`https://localhost:44312/api/Placement?PId=${id}`)
      .then(res => {
        console.log('Record is deleted', res);
      
        navigate(0);
      })
      .catch(error => {
        console.log(error);
      });
  };

 
  return (
    <Card {...rest}>
      <CardContent>
      <Box display="flex" justifyContent="center" mb={3}>
          {placement.File &&
            placement.File.map((d, i) => (
              <a href={d} target="blank" key={i}>
                <img alt="PlacementImages" src={d} style={{width:"50px",height:"50px"}} />
              </a>
            ))}
        </Box>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
         {placement.Title}
        </Typography>
        <Divider />
        <Typography align="center" color="textPrimary" variant="body1">
          {placement.Description}
        </Typography>
        <Divider />
        <Typography align="center" color="textPrimary" variant="body1">
          Campus Type: {placement.CampusType}
        </Typography>
        <Divider />
        <Typography align="center" color="textPrimary" variant="body1">
          Eligible Departments: {placement.Eligible_Department}
        </Typography>
        <Divider />
        <Typography align="center" color="textPrimary" variant="body1">
          Organized By: {placement.Organizedby}
        </Typography>
        <Divider />
        <Typography align="center" color="textPrimary" variant="body1">
          Company Name: {placement.CompanyName}
        </Typography>
        <Divider />
        <Typography align="center" color="textPrimary" variant="body1">
          Date: {placement.DatePicker}
        </Typography>
      </CardContent>
      <Box flexGrow={1} />
      <Divider />
      <Box p={2}>
        <Grid container justify="space-between" spacing={2}>
        {placement.File1 && (
          <a href={placement.File1} target={placement.File1}>
            <Grid item>
              <GetAppIcon color="action" />

              <Typography
                color="textSecondary"
                display="inline"
                variant="body2"
              >
                Download File
              </Typography>
            </Grid>
          </a>
        )}
          <Box>
            <Grid item>
            <Button onClick={() => deletePlacementData(placement.PId)}>
              <DeleteIcon color="action" />

              <Typography
                color="textSecondary"
                display="inline"
                variant="body2"
              >
                Delete Record
              </Typography>
              </Button>
            </Grid>
          </Box>
        </Grid>
      </Box>
    </Card>
  );
};

PlacementReportCard.propTypes = {
  className: PropTypes.string,
  placement: PropTypes.object.isRequired
};

export default PlacementReportCard;
