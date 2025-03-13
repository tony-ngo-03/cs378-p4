import React from "react";


function LocationButton({city, getBreweryDataByCity}){
    
    const update = () => {
        getBreweryDataByCity(city, 10);
    }
    return (
        <button onClick={update} className="rounded-2">{city}</button>
    );
}

export default LocationButton;