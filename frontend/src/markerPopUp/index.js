import React from 'react';
import RegisterButton from '../RegisterButton';

function MarkerPopUp(props) {
    return (
        <div>
            <h3>{props.title}</h3><p>{props.description}</p><p id="capacity">{props.numberRegistered}/{props.capacity}</p>
            <RegisterButton 
                mapBoxData={props.mapBoxData}
                setMapBoxData={props.setMapBoxData}
            />
        </div>
    )
}

export default MarkerPopUp;