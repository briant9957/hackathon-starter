import React, {Component} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

class EventList extends Component {
    render() {
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
                <ListItem>
                  <ListItemText
                    primary="Single-line item"
                    secondary={false ? 'Secondary text' : null}
                  />
                </ListItem>,
              )}
            </List>
        )
    }
}

export default EventList;