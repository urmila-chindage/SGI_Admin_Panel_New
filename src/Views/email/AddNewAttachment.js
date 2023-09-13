import {
  Box,
  Card,
  CardHeader,
  Divider,
  makeStyles,
  TextField,
  Typography
} from '@mui/material';
import React from 'react';
import { useState } from 'react';

import Button from '@mui/material/Button';

const AddNewAttachment = ({ ...rest }) => {
 

  const [data, setData] = useState({
    fileName: '',
    file: null,
    downloadURL: ''
  });
  const [isDisabled, setIsDisables] = useState(false);


  const uploadFileAsync = async (file, storageRef, name) => {
    const ref = storageRef.child('testimonials').child(name);
    const snapshot = await ref.put(file);
    return await snapshot.ref.getDownloadURL();
  };

  return (
    <Card {...rest}>
      <CardHeader title="Upload Attachment To Cloud" />

      <Divider />
      <TextField
        fullWidth
        label="File Name"
        margin="normal"
        name="filename"
        onChange={e => {
          setData({ ...data, fileName: e.target.value });
        }}
        value={data.fileName}
        variant="outlined"
      />
      <Typography color="textPrimary" variant="h4">
        File:
      </Typography>
      <TextField
        fullWidth
        margin="normal"
        name="file"
        onChange={e => {
          setData({ ...data, file: e.target.files[0] });
        }}
        type="file"
        variant="outlined"
      />
      {data.downloadURL && (
        <Box>
          <Typography color="primary" variant="h5">
            {data.downloadURL}
          </Typography>
        </Box>
      )}
      <Box my={2}>
        <Button
          color="primary"
          fullWidth
          size="large"
          type="submit"
          variant="contained"
         
          disabled={isDisabled}
        >
          Upload
        </Button>
      </Box>
    </Card>
  );
};

export default AddNewAttachment;
