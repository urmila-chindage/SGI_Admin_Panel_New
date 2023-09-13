import React from 'react';
import {
  Box,
  Container,
  Typography,
  useTheme
} from '@mui/material';
import Header from "../../components/Header";
import { tokens } from "../../theme";
import PageNotFoundImage from "../../Images/undraw_page_not_found_su7k.svg";



const NotFoundView = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
    <Header title="Page Not Found" />
  
    <Box display="flex" justifyContent="space-between">
      {/* CALENDAR SIDEBAR */}
      <Box
        flex="1 1 20%"
        backgroundColor={colors.primary[400]}
        p="15px"
        borderRadius="4px"
      >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="md">
          <Typography
            align="center"
            color="textPrimary"
            variant="h1"
          >
            404: The page you are looking for isn’t here
          </Typography>
          <Typography
            align="center"
            color="textPrimary"
            variant="subtitle2"
          >
            You either tried some shady route or you came here by mistake.
            Whichever it is, try using the navigation
          </Typography>
          <Box textAlign="center">
            <img
              alt="Under development"
              style={{marginTop:"50px",display:"inline-block",maxWidth:"100%",width:"560px"}}
              src={PageNotFoundImage}
            />
          </Box>
        </Container>
      </Box>
      </Box>
      </Box>
      </Box>
 
  );
};

export default NotFoundView;
