import React from 'react';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
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
  <List 
    style={{maxHeight: '100%', overflow: 'auto'}} 
    className="ListParent" 
    dense={false}
    >
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
