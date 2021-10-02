import {React, useState} from 'react';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';


export default function ExpandedCard(props) {
  const useStyles = makeStyles(theme => ({
    icons: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'left',
      'margin-top': '5px'
      
    },
  }));  

  const classes = useStyles();
  
  return (
      <Card sx={{ maxWidth: 1 }}>
      <CardHeader
        // title={props.title}
        title={"Walkin around I guess"}
        // subheader={props.activityType}
        subheader={"Physical Activity Opportunity"}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {/* {props.activityDate} */}
          11/11/2021 12:00:00 PM
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        
      </CardActions>
        <CardContent>
          <Typography >
            {/* {props.activityDescription} */}
            Come on down and walk around!! It's really fun 123123123132212 31231231231231231231
          </Typography>
        <IconButton className={classes.icons} aria-label="add to favorites" >
          <FavoriteIcon />
        </IconButton>
        </CardContent>
    </Card>
    );
  }