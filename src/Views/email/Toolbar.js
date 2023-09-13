import React from 'react';
import PropTypes from 'prop-types';

import { Avatar, Box, Button, makeStyles, Typography } from '@mui/material';


const Toolbar = ({ handleDrawerOpen, ...rest }) => {
 

  return (
    <div {...rest}>
      <Box display="flex" justifyContent="flex-end">
        <Box alignItems="center" display="flex" flexDirection="column" p={2}>
          <Avatar>A</Avatar>
          <Typography color="textPrimary" variant="h5">
            admin@gmail.com
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
