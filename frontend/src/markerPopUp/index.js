import React from 'react';
import Button from '@mui/material/Button';

function MarkerPopUp(props) {
    return (
        <div>
            <h3>{props.title}</h3><p>{props.description}</p>
            <Button variant="outlined">Register</Button>
        </div>
    )
}

export default MarkerPopUp;