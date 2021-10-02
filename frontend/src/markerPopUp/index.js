import React from 'react';
import RegisterButton from '../RegisterButton';

function MarkerPopUp(props) {
    return (
        <div>
            <h3>{props.title}</h3><p>{props.description}</p>
            <RegisterButton />
        </div>
    )
}

export default MarkerPopUp;