import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles
} from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';


const user = {
  avatar: '/static/images/avatars/avatar_6.jpg',
  city: 'Los Angeles',
  country: 'USA',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith',
  timezone: 'GTM-7'
};


const Profile = ({...rest }) => {
  

  const [userData, setUserData] = useState({
    email: '',
    name: ''
  });

 

  

  return (
    <Card {...rest}>
      <CardContent>
        <Box alignItems="center" display="flex" flexDirection="column">
          <Avatar>GS LLP</Avatar>
          <Typography color="textPrimary" gutterBottom variant="h3">
            Ghodawat Softech LLP
          </Typography>
          <Typography
           
            color="textSecondary"
            variant="h6"
          >
          ghodawatsoftech.developers@gmail.com
          </Typography>
          <Typography
           
            color="textSecondary"
            variant="subtitle2"
          >
            All emails will be sent using this email Id
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          color="primary"
          fullWidth
          variant="text"
         
        >
          Change Account
        </Button>
      </CardActions>
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
