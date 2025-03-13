import './App.css';
import React, {useState, useEffect} from 'react';

import 'bootstrap/dist/css/bootstrap.min.css'; // This imports bootstrap css styles. You can use bootstrap or your own classes by using the className attribute in your elements.
import LocationSelector from './components/LocationSelector';
import BreweryItem from './components/BreweryItem';

function App() {

  // API for finding breweries
  const brewery_url = "https://api.openbrewerydb.org/v1/breweries"

  // use states for variable handling
  const [breweryList, setBreweryList] = useState([]);
  const [knownCities, setKnownCities] = useState(['Austin', 'Dallas', 'Houston'])
  const [errorText, setErrorText] = useState("")
  const [currLat, setCurrLat] = useState(0.0)
  const [currLon, setCurrLon] = useState(0.0)
  const [currentCity, setCurrentCity] = useState('Austin')
  
  async function getBreweryDataByCity(city, amount){
    try{
      
      // geocode the city first to lat, long
      const geo_response = await fetch(`https://nominatim.openstreetmap.org/search?q=${city}&format=json`)
      const geo_json = await geo_response.json()
      
      // if the city is not found then throw an error
      if (geo_json.length < 1 || geo_json[0]['addresstype'] !== "city"){
        throw new Error(`Latitude and Longitude not found for ${city}. Please check your spelling.`)
      }

      // get the breweries closest to that city
      const lat = geo_json[0].lat
      const lon = geo_json[0].lon
      const response = await fetch(brewery_url + `?by_dist=${lat},${lon}&page=1&per_page=${amount}`);
      const tempList = await response.json();

      // we need at least 10 data points so if for some reason there is not then throw an error
      if (tempList.length < 10){
        throw new Error("Not enough breweries in this location")
      }
      

      // create a button out of this city if we do not have it yet
      if (!knownCities.includes(city)){
        setKnownCities([...knownCities, city.replaceAll('_', ' ')])
      }
      setCurrentCity(city);

      // set variables and update the list
      setCurrLat(lat)
      setCurrLon(lon)
      setBreweryList(tempList);
    }
    catch (err){
      setErrorText(err.message);
      setBreweryList([]);
    }
  }

  // https://stackoverflow.com/questions/74639791/how-to-fetch-api-as-soon-as-page-is-loaded-in-react
  useEffect(() => {
    getBreweryDataByCity("Austin", 10);
  }, []);

  var typedCity = ""
  // functionality for adding a new city
  const addNewCity = () => {
    if(typedCity.trim().length === 0){
      return
    }
    typedCity = typedCity.replaceAll(' ', '_')
    getBreweryDataByCity(typedCity, 10);
    typedCity = ""
  }

  return (
    <div>
      <h1>10 Closest Breweries List</h1>
      <h4>Select a city or enter your own</h4>
      <hr></hr>
      {/* Location Selection */}
      <LocationSelector cities={knownCities} getBreweryDataByCity={getBreweryDataByCity} currentCity={currentCity} setCurrentCity={setCurrentCity}></LocationSelector>
      <input type='text' name='new-city' onChange={(e) => {typedCity = e.target.value}}></input>
      <button onClick={addNewCity} className='rounded-2'>+</button>
      
      {/* Display Data for Selected Location */}
      {/* If there is no data or not enough data because of an error display that error */}
      {/* Name of Brewey, Address, Type of Brewery, Website, and Approximate Distances (km) */}
      {/* https://getbootstrap.com/docs/4.0/content/tables/ */}
      {
        breweryList.length < 10 ? <h1>{errorText}</h1> : <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Type</th>
            <th>Website</th>
            <th>Approximate Distance (km)</th>
          </tr>
        </thead>
        <tbody>
        {breweryList.map((item, index) => (
          <BreweryItem key={index} name={item.name} address={item.street} city={item.city} state={item.state} postalCode={item.postal_code} type={item.brewery_type} website={item.website_url}
          lon={item.longitude} lat={item.latitude} currLat={currLat} currLon={currLon}></BreweryItem>
          ))}
        </tbody>
      </table>
      }
    </div>
  );
}

export default App;