import {React, useState} from 'react';
import { makeStyles, styled } from '@mui/styles'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import RegisterButton from '../RegisterButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from '@mui/material/Grid';


export default function ExpandedCard(props) {
  /* const FormattedRegisterButton = styled(RegisterButton)({
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px'
  }); */
  const getNumberOfParticipants = (memberList) => {
    if (memberList == null || memberList.length == null) {
      return 0;
    } else {
      return memberList.length;
    }
  }
  
  const getHumanReadableDates = (dateString) => {
    if (dateString) {
      let date = new Date(dateString); 
      return date.toLocaleString();
    } else {
      return dateString;
    }
  }

  const renderParticipantsText = (registeredCount, capacity) => {
    if (registeredCount === capacity) {
      return (
        <Typography variant="subtitle2" color="error.main">
          Capacity: {registeredCount} / {capacity}
        </Typography>
      )
    } else {
      return (
        <Typography variant="subtitle2" color="text.secondary">
          Capacity: {registeredCount} / {capacity}
        </Typography>
      )
    }
  }

  return (
    <Card sx={{ maxWidth: 1 }}>
      <CardHeader
        title={props.title}
        subheader={props.activityType}
      />
        <CardContent>
          <Grid>
            <Grid pb={1}>
              <Typography>
                {props.activityDescription}
              </Typography>
            </Grid>

            <Grid>
              <Typography variant="body2" color="text.secondary">
                Starts: {getHumanReadableDates(props.activityStartDate)}
                <br/>
                Ends: {getHumanReadableDates(props.activityEndDate)}
              </Typography>
              {renderParticipantsText(getNumberOfParticipants(props.activityNumRegistered), props.activityCapacity)}
            </Grid>

            <Grid pt={1} align="right">
              <RegisterButton className="register-button" aria-label="Register For Event" />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }