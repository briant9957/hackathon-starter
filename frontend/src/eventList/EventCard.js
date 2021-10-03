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
import MoreVertIcon from '@mui/icons-material/MoreVert';


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
  
  return (
    <Card sx={{ maxWidth: 1 }}>
      <CardHeader
        title={props.title}
        // title={"Walkin around I guess"}
        subheader={props.activityType}
        // subheader={"Physical Activity Opportunity"}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.activityStartDate}
          {props.activityEndDate}
          {/* 11/11/2021 12:00:00 PM */}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {getNumberOfParticipants(props.activityNumRegistered)} / {props.activityCapacity}
          {/* 30 Spots Total */}
        </Typography>
      </CardContent>
        <CardContent>
          <Typography >
            {props.activityDescription}
            {/* Come on down and walk around!! It's really fun 123123123132212 31231231231231231231 */}
          </Typography>
        <RegisterButton className="register-button" aria-label="Register For Event" >
        </RegisterButton>
        </CardContent>
      </Card>
    );
  }