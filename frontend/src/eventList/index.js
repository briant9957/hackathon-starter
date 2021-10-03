import React, {Component} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Card from '@mui/material/Card';
import { CardContent } from '@mui/material';
import ExpandedCard from './EventCard';

export default function EventList(props) {
  // function generate(element, arrayList) {
  //   return arrayList =>
  //     React.cloneElement(element, {
  //       key: value,
  //     }),
  //   );
  // }
  const getCardList = () => {
    if (props.arrayList === undefined) return;
    return props.arrayList.map((value, key) => (
      <Card 
        sx={{marginTop:1, marginBottom: 1, marginLeft:2, marginRight:2}}
        key={key}
        variant="outlined" 
        className="ListItem">
        <ExpandedCard
          title={value.title}
          activityType={value.activityType}
          activityStartDate={value.start}
          activityEndDate={value.end}
          activityCapacity={value.capacity}
          activityNumRegistered={value.memberNames}
          activityDescription={value.description}>
        </ExpandedCard>
      </Card>
    ));
  }

  return (
  <List 
    style={{maxHeight: '100%', overflow: 'auto'}} 
    className="ListParent" 
    dense={false}
    >
    {getCardList()}
  </List>
  )
}
