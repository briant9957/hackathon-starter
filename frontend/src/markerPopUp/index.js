import React, {useState} from 'react';
import RegisterButton from '../RegisterButton';

function MarkerPopUp(props) {
    const [numberRegistered, setNumberRegistered] = useState(props.numberRegistered);
    const handleClick = () => {
        if (numberRegistered >= props.capacity) return;
        const newNumberRegistered = parseInt(numberRegistered) + 1
        setNumberRegistered(newNumberRegistered.toString());
    }
    return (
        <div>
            <h3>{props.title}</h3><p>{props.description}</p><p id="capacity">{numberRegistered}/{props.capacity}</p>
            <RegisterButton 
                mapBoxData={props.mapBoxData}
                setMapBoxData={props.setMapBoxData}
                handleClick={handleClick}
            />
        </div>
    )
}

export default MarkerPopUp;