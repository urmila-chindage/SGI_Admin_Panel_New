import React from 'react';
import PropTypes from 'prop-types';

import { Box, Button, makeStyles } from '@mui/material';



const Toolbar = ({ handleDrawerOpen, ...rest }) => {
 
  return (
    <div {...rest}>
      <Box display="flex" justifyContent="flex-end">
        <Button color="primary" variant="contained" onClick={handleDrawerOpen}>
          Add Placement Report
        </Button>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
