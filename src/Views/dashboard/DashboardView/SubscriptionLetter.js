import React from 'react';

import PropTypes from 'prop-types';
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles
} from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import ContactMailIcon from '@material-ui/icons/ContactMail';


const Subscribers = ({...rest }) => {
 

  const [subscribers, setSubscribers] = useState(0);
  
  return (
    <Card {...rest}>
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              SUBSCRIBERS(newsletter)
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {subscribers}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <ContactMailIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

Subscribers.propTypes = {
  className: PropTypes.string
};

export default Subscribers;
