import React from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Button,
  makeStyles
} from '@mui/material';




const Toolbar = ({ openDrawer, ...rest }) => {
  

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
          onClick={openDrawer}
        >
          Add Update
        </Button>
      </Box>

    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
