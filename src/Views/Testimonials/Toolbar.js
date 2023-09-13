import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
 
} from '@mui/material';



const Toolbar = ({ className, handleDrawerOpen, ...rest }) => {


  return (
    <div
      
      {...rest}
    >
      <Box
        display="flex"
        justifyContent="flex-end"
      >
        <Button
          color="primary"
          variant="contained"
          onClick={handleDrawerOpen}
        >
          Add Testimonial
        </Button>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
