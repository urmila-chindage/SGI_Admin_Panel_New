import React from 'react';
import { v4 as uuid } from 'uuid';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  makeStyles,
} from '@mui/material';
import { useState } from 'react';
import axios from "axios";
var _ = require('lodash');




const AddCommittee = ({handleDrawerClose}) => {

   
    const [data, setData] = useState({
      year: '',
      committeeName: '',
      committeeMembers: [
        {
          memberName: '',
          designation: ''
        }
      ]
    })
    const [inputCount,setInputCount] = useState({
      count:1
    })


  

    return (
       
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              year: '',
              committeeName: '',
              committeeMembers: []
            }}
           
            onSubmit={async () => {
              const payload = {
                CYear : data.year,
                CName : data.committeeName,
                addCommitteeData : data.committeeMembers
              }
              console.log(payload)
             await axios.post("https://localhost:44312/api/Committee",payload)
           
                .then((res)=>{
                  console.log(res.data);
                 
                })
                .catch((error)=>{
                  console.log(error)
                })
            }}
          >
            {({              
              handleSubmit,
              isSubmitting,
            }) => (
              <Box
              display="flex"
              flexDirection="column"
              overflow="scroll"
              height="600px"
              >
              <form 
              onSubmit={handleSubmit}
              
              >
                <Box 
                mb={3}
                >
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Add new Committee
                  </Typography>
                </Box>
                <TextField
                  fullWidth
                  label="Committee Name"
                  margin="normal"
                  name="committeeName"
                  onChange={(e) => {
                    setData({...data, committeeName: e.target.value});
                  }}
                  value={data.committeeName}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Year(YYYY-YY)"
                  margin="normal"
                  name="year"
                  onChange={(e) => {
                    setData({...data, year: e.target.value});
                  }}
                  value={data.year}
                  variant="outlined"
                />
                    <Box>
                    <Button variant="outlined" color="primary"
          onClick={e => {
            setInputCount({...inputCount, count: inputCount.count + 1})
            let obj = {
              memberName: '',
              designation: ''
            }
            let members = data.committeeMembers;
            members.push(obj);
            setData({...data, committeeMembers: members})
          }}
          >
            +
          </Button>
          <Button variant="outlined" color="secondary"
          onClick={e => {
            let list = data.committeeMembers
            if(inputCount.count > 1){
              if(data.committeeMembers.length > 0 && data.committeeMembers.length === inputCount.count) {
                  list.splice(data.committeeMembers.length - 1, 1);
              }
              setInputCount({...inputCount, count: inputCount.count - 1})
              setData({...data, committeeMembers: list})
            }
          }}
          >
            -
          </Button>
          {_.times(inputCount.count, i => (
            <Box border={2} borderColor="secondary.main" m={0.5} p={0.5}>
              <TextField
              fullWidth
              label="Member Name"
              margin="normal"
              name="memberName"
              onChange={(e) => {
                let members = data.committeeMembers
                members[i]["memberName"] = e.target.value
                setData({...data, committeeMembers: members});
                //setData({...data, committeeMembers: data.committeeMembers});
              }}
              value={data.committeeMembers[i].memberName}
              variant="outlined"
            />
             <TextField
              fullWidth
              label="Designation"
              margin="normal"
              name="designation"
              onChange={(e) => {
                let members = data.committeeMembers
                members[i]["designation"] = e.target.value
                setData({...data, committeeMembers: members});
              }}
              value={data.committeeMembers[i].designation}
              variant="outlined"
            />
          </Box>
           ))}
      </Box>
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Add
                  </Button>
                </Box>
              </form>
              </Box>
            )}
          </Formik>
        </Container>
      </Box>
   
    );
}

export default AddCommittee;
