import {
    Avatar,
    Box,
    Button,
    Card,
    CardHeader,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    makeStyles,
    TextField
  } from '@mui/material';
  import React from 'react';

  
  import { useState } from 'react';
  
  
  import { useEffect } from 'react';
 
  
  
  const VideoCarousel = ({ className, ...rest }) => {
   
    const [data, setData] = useState({
      title: '',
      url: ''
    });
    const [allData, setAllData] = useState([]);
  
   
  
   
   
       
   
    return (
      <Card {...rest}>
        <Grid spacing={1} container>
          <Grid item lg={4} md={4} xl={12} xs={12}>
            <Card>
              <CardHeader title="Add Video" />
              <Divider />
              <TextField
                fullWidth
                label="Title"
                margin="normal"
                name="title"
                onChange={e => {
                  setData({ ...data, title: e.target.value });
                }}
                value="dffdg"
                variant="outlined"
                required
              />
              <TextField
                fullWidth
                label="Video URL"
                margin="normal"
                FormHelperTextProps="help"
                name="url"
                onChange={e => {
                  setData({ ...data, url: e.target.value });
                }}
                value="dffgg"
                variant="outlined"
                required
              />
              <Box my={2}>
                <Button
                  color="primary"
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                 
                >
                  Add
                </Button>
              </Box>
            </Card>
          </Grid>
          <Grid item lg={8} md={8} xl={12} xs={12}>
            <Card>
              <CardHeader subtitle="dfgfdg" title="All Videos" />
              <Divider />
              <Box
                height="450px"
                display="flex"
                flexDirection="column"
                overflow="scroll"
              >
                <List>
                 
                      <ListItem divider={10}>
                        <ListItemAvatar>
                          <Avatar>
                           fgfghgfh
                          </Avatar>
                        </ListItemAvatar>
                        <Grid container>
                          <Grid item lg={8} md={8} xl={12} xs={12}>
                            <ListItemText primary="dfdgf" />
                          </Grid>
                          <Grid item lg={4} md={4} xl={4} xs={4}>
                            <ListItemText secondary>
                              <Button
                                variant="outlined"
                                color="primary"
                                href="fffgh"
                                target="blank"
                              >
                                Open Video
                              </Button>
                            </ListItemText>
                          </Grid>
                        </Grid>
                        <Button
                          variant="outlilned"
                          color="secondary"
                         
                        >
                         
                        </Button>
                      </ListItem>
                    
                </List>
              </Box>
              <Divider />
            </Card>
          </Grid>
        </Grid>
      </Card>
    );
  };
  
  export default VideoCarousel;
  