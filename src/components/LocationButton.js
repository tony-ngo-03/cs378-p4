import React from "react";

function LocationButton({city, getBreweryDataByCity, setCurrentCity, selected}){
    
    const update = () => {
        // when pressed update everything from App.js
        getBreweryDataByCity(city, 10);
        setCurrentCity(city);
    }

    return (
        <button onClick={update} className={"rounded-2" + (selected ? " selected" : "")}>{city}</button>
    );
}

export default LocationButton;