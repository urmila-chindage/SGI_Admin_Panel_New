import React from 'react';
import { Box, Container, Grid,useTheme} from '@mui/material';

import Profile from './Profile';
import SendMailToSubscribers from './SendMailToSubscribers';
import AddNewAttachment from './AddNewAttachment';
import Header from "../../components/Header";
import { tokens } from "../../theme";

const EmailView = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
    <Header title="Email" subtitle="Email Sending Format" />
  
    <Box display="flex" justifyContent="space-between">
      {/* CALENDAR SIDEBAR */}
      <Box
        flex="1 1 20%"
        backgroundColor={colors.primary[400]}
        p="15px"
        borderRadius="4px"
      >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item lg={3} md={4} xs={12}>
            <Profile />
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            {/* <ProfileDetails /> */}
            <Box>
              <SendMailToSubscribers />
            </Box>
            <Box>
              <AddNewAttachment />
            </Box>
          </Grid>
        </Grid>
      </Container>
      </Box>
      </Box>
       </Box>
   
  );
};

export default EmailView;
