import React, {Component} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

function EventList(props) {
  function generate(element) {
    return [0, 1, 2].map((value) =>
      React.cloneElement(element, {
        key: value,
      }),
    );
  }

  return (
  <List className="ListParent" dense={false}>
    {generate(
      <ListItem className="ListItem">
        <ListItemText
          primary={props.text}
          secondary={false ? 'Secondary text' : null}
        />
      </ListItem>,
    )}
  </List>
  )
}

export default EventList;