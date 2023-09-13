import React, { useState,useEffect } from 'react';


import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardHeader,
  Divider,
  makeStyles,
  List,
  ListItem,
  ListItemText,
  FormControl,
  Button
} from '@mui/material';
import axios from "axios";


const SubscribersList = ({ ...rest }) => {
 

  const [subscribers, setSubScribers] = useState([]);

  const getAllSubscribers = async() =>{
    await axios.get("https://localhost:44312/api/ClientSub/GetAllCSubscriber")
    .then((res)=>{
      console.log(res.data.data);
      setSubScribers(res.data.data);
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  const getFormatedArray = arr => {
    let combinedData = 'data:text/csv;charset=utf-8,Email,CreatedDate, \r\n';

    arr.forEach((val, idx) => {
      let propertiesArray = [];
      propertiesArray.push(val.Email);
      propertiesArray.push(val.CreatedDate);
      combinedData += propertiesArray.join(',') + '\r\n';
    });

    return combinedData;
  };

  const handleCSVDownload = e => {
    var link = document.createElement('a');
    let data = getFormatedArray(subscribers);
    var encodedUri = encodeURI(data);
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'contacts.csv');
    document.body.appendChild(link);

    link.click();
  };

  useEffect(()=>{
    getAllSubscribers()
  },[])

  const DownloadCSV = () => (
    <Box>
      <FormControl>
        <Button onClick={handleCSVDownload} color="primary" size="large" variant="contained">Export CSV</Button>
      </FormControl>
    </Box>
  );

  return (
    <Card {...rest}>
      <CardHeader title="SubScribers" action={<DownloadCSV />} />
      <Divider />
      <Box
        height="450px"
        display="flex"
        flexDirection="column"
        overflow="scroll"
      >
        <List>
          {subscribers.map((subscriber, index) => (
            <ListItem divider={index < subscribers.length - 1} key={index}>
              <ListItemText
                primary={subscriber.Email}
                secondary={`SubScribed On: ${subscriber.CreatedDate}`}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Card>
  );
};

SubscribersList.propTypes = {
  className: PropTypes.string
};

export default SubscribersList;
