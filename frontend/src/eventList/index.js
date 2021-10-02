import React, {Component} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Card from '@mui/material/Card';
import { CardContent } from '@mui/material';
import ExpandedCard from './EventCard';

export default function EventList(props) {
  function generate(element) {
    return [0, 1, 2].map((value) =>
      React.cloneElement(element, {
        key: value,
      }),
    );
  }

  return (
  <List dense={false}>
    {generate(
      <Card variant="outlined" className="ListItem">
        <ExpandedCard>
          primary={props.text}
          secondary={false ? 'Secondary text' : null}
        </ExpandedCard>
      </Card>,
    )}
  </List>
  )
}
