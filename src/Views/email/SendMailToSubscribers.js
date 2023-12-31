import {
  Box,
  Card,
  CardHeader,
  Divider,
  makeStyles,
  TextField
} from '@mui/material';
import React from 'react';
import { useState } from 'react';

import Button from '@mui/material/Button';

const SendMailToSubscribers = ({ className, ...rest }) => {
 

  const [data, setData] = useState({
    subject: '',
    html: ''
  });
  const [isDisabled, setIsDisables] = useState(false);


 
  const previewEmail = () => {
    let html = data.html;
    html = html.replaceAll('"', "'");
    let win = window.open('', '', 'width=auto, height=auto');
    win.document.write(html);
  };

  //   useEffect(() => {}, []);
  return (
    <Card {...rest}>
      <CardHeader title="Send Email To All Subscribers" />

      <Divider />
      <TextField
        fullWidth
        label="Subject"
        margin="normal"
        name="subject"
        onChange={e => {
          setData({ ...data, subject: e.target.value });
        }}
        value={data.subject}
        variant="outlined"
      />
      <TextField
        id="outlined-multiline-static"
        label="Enter HTML (enter html with inline/internal CSS only)"
        fullWidth
        multiline
        rows={10}
        variant="outlined"
        onChange={e => {
          setData({ ...data, html: e.target.value });
        }}
        value={data.html}
      />
      <Box my={2}>
        <Button
          color="primary"
          fullWidth
          size="large"
          type="submit"
          variant="contained"
         
          disabled={isDisabled}
        >
          Send
        </Button>
        <Button
          fullWidth
          size="large"
          variant="contained"
          style={{ backgroundColor: '#35BDD0' }}
          onClick={previewEmail}
        >
          Preview
        </Button>
      </Box>
    </Card>
  );
};

export default SendMailToSubscribers;
