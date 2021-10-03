import Button from '@mui/material/Button';
import React from 'react';

function RegisterButton(props) {
    const handleClick = () => {
        console.log("it works");
        
        const updatedMapBoxData = {...props.mapBoxData};
        const newCapacity = parseInt(updatedMapBoxData.data.features[0].properties.capacity) + 1
        updatedMapBoxData.data.features[0].properties.capacity = newCapacity.toString();
        props.setMapBoxData(updatedMapBoxData);
    }

    return <Button variant="outlined" onClick={props.handleClick}>Register</Button>;  
} 

export default RegisterButton;