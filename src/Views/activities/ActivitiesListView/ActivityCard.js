import React from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import GetAppIcon from '@mui/icons-material/GetApp';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';



const ActivityCard = ({ activity, ...rest }) => {
  
  const navigate = useNavigate();
  
  const deleteActivityData = async id => {
    await axios
      .delete(`https://localhost:44312/api/Activity?ActId=${id}`)
      .then(res => {
        console.log('Record is deleted', res);
       
        navigate(0);
      })
      .catch(error => {
        console.log(error);
      });
  };


  return (
    <Card
      
      {...rest}
    >
      <CardContent>
        <Box
          display="flex"
          justifyContent="center"
          mb={3}
        >
          {activity.File &&
              activity.File.map((d,i) => (
                    <a href={d} target="blank" key={i}>
                        <img
                        alt="Activity"
                        src={d}
                        style={{width:"100px",height:"100px"}}
                        />
                    </a>
              ))
          }
          
        </Box>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
         {activity.Title}
        </Typography>
        <Divider />
        <Typography
          align="center"
          color="textPrimary"
          variant="body1"
        >
         {activity.Description}
        </Typography>
        <Divider />
        <Typography
          align="center"
          color="textPrimary"
          variant="body1"
        >
         Type: {" "}{activity.Type}
        </Typography>
        <Divider />
        <Typography
          align="center"
          color="textPrimary"
          variant="body1"
        >
          Department: {" "}{activity.Department}
        </Typography>
        <Divider />
        <Typography
          align="center"
          color="textPrimary"
          variant="body1"
        >
         Duration: {" "}{activity.Duration}
        </Typography>
        <Divider />
        <Typography
          align="center"
          color="textPrimary"
          variant="body1"
        >
         Category: {" "}{activity.EventFor}
        </Typography>
        <Divider />
        <Typography
          align="center"
          color="textPrimary"
          variant="body1"
        >
         Date: {" "}{activity.DatePickerDialog}
        </Typography>
      </CardContent>
      <Box flexGrow={1} />
      <Divider />
      <Box p={2}>
        <Grid
          container
          justify="space-between"
          spacing={2}
        >
        {activity.File1 && (
          <a href={activity.File1} target={activity.File1}>
          <Grid
           
            item
          >
            <GetAppIcon
            
              color="action"
            />
            
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
        <Box
          onClick={() => deleteActivityData(activity.ActId)}
        >
        <Grid
           
            item
          >
            <DeleteIcon
            
              color="action"
            />
            
            <Typography
              color="textSecondary"
              display="inline"
              variant="body2"
            >
              Delete Record
            </Typography>
          </Grid>
        </Box>
        </Grid>
      </Box>
    </Card>
  );
};

ActivityCard.propTypes = {
  className: PropTypes.string,
  activity: PropTypes.object.isRequired
};

export default ActivityCard;
