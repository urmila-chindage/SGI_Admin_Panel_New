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
  Button,
  useTheme
} from '@mui/material';
import { tokens } from "../../../theme";

import DeleteIcon from '@mui/icons-material/Delete';
import GetAppIcon from '@mui/icons-material/GetApp';
import { useNavigate } from 'react-router-dom';
import axios from "axios";






const AchivementCard = ({achivement, ...rest }) => {
 
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

const deleteAchivementCard = async id => {
  await axios
    .delete(`https://localhost:44312/api/Achivement?AId=${id}`)
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
          <img
            alt="Achievement"
            src={achivement.Image}
           style={{width:"50px",height:"50px"}}
          />
        </Box>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
         {achivement.Title}
        </Typography>
        <Divider />
        <Typography align="center" color="textPrimary" variant="body1">
          Achived By: {achivement.Category}
        </Typography>
        <Divider />
        <Typography align="center" color="textPrimary" variant="body1">
          Achived on: {achivement.CreatedDate}
        </Typography>
        <Divider />
        <Typography align="center" color="textPrimary" variant="body1">
          Department: {achivement.Department}
        </Typography>
        <Divider />
        <Typography align="center" color="textPrimary" variant="body1">
          {achivement.Description}
        </Typography>
      </CardContent>
      <Box flexGrow={1} />
      <Divider />
      <Box p={2}>
        <Grid container justify="space-between" spacing={2}>
          <Grid item>
            <a href={achivement.File} target={achivement.File}>
            <GetAppIcon color="action" />

              <Typography
                color="textSecondary"
                display="inline"
                variant="body2"
              >
                Download Uploaded File
              </Typography>
            </a>
          </Grid>
          <Grid item>
            <Button onClick={() => deleteAchivementCard(achivement.AId)}>
            <DeleteIcon color="action" />
              <Typography
                color="textSecondary"
                display="inline"
                variant="body2"
              >
                Delete Achievement
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

AchivementCard.propTypes = {
  className: PropTypes.string,
  achivement: PropTypes.object.isRequired
};

export default AchivementCard;
