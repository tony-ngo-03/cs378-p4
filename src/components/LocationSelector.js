import LocationButton from "./LocationButton";

function LocationSelector({cities, getBreweryDataByCity, currentCity, setCurrentCity}){
    return (
        <div>
            {cities.map((item, index) => <LocationButton key={index} city={item} getBreweryDataByCity={getBreweryDataByCity} setCurrentCity={setCurrentCity} selected={currentCity === item} ></LocationButton>)}
        </div>
    );
}

export default LocationSelector;