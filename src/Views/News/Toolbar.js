import React from 'react';
import PropTypes from 'prop-types';

import { Box, Button, makeStyles } from '@mui/material';


const Toolbar = ({

  handleDrawerOpen,
  handleImpLinksOpen,
  ...rest
}) => {
 

  return (
    <div {...rest}>
      <Box display="flex" justifyContent="flex-end">
        <Button color="primary" variant="contained" onClick={handleDrawerOpen} style={{marginRight:'15px'}}>
          Add News
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={handleImpLinksOpen}
        >
          Add Imp Links
        </Button>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
