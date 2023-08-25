import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import config from '../../../config';
import { useSelector } from 'react-redux';
import { useEffect, } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
export default function LeadHistory() {
  const [data, setData] = React.useState([])
  var token = localStorage.getItem("token");
  const [activeStep, setActiveStep] = React.useState(0);
  const params = useParams()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/leadSource/get-lead-history/${params.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setData(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [params.id, token]);



  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {data.map((step, index) => (
          <Step>
            <StepLabel>
              
              <Typography style={{ fontFamily: "poppins" }}>{step.fieldType} by <strong>{step.createdByUser || step.updatedByUser}</strong></Typography>
              {step.updatedByUser != null ?
                <>
                  {step && step.updatedFields.map((ele) => {
                    const keyValuePairs = Object.entries(ele);
                    // console.log(ele)  
                    for (const key in ele) {
                      console.log(`Property "${key}" has a non-null value: ${ele[key]}`);
                      if ( ele[key] !== null || ele[key] !== " " ) {
                        
                        return (
                          <>
                            <div>
                              {keyValuePairs.map(([key, value], index) => (
                                <p key={index} style={{ fontFamily: "poppins",color:"black" }}>
                                  {key=="assignedManager" || key == "alternateManager" || key == "assignedLead" || key == "assignedUser"|| key=="alternateLead" || key == "reminderCall " || key == "company" || key == "reminderCall"?"":key} <strong>{Array.isArray(value)|| key == "assignedManager" || key == "alternateManager" || key == "company"|| key == "reminderCall" ||  key == "assignedLead" || key=="alternateLead" ?"": value }</strong>
                                </p>
                              ))}
                            </div>
                            {/* <Typography style={{ fontFamily: "poppins" }}>Updated Fields are {key} - <strong>{ele[key]}</strong></Typography> */}
                          </>
                        )
                      }
                    }

                  })}
                </> : <></>}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

    </Box>
  );
}