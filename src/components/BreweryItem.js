import React from "react";


function BreweryItem({name, address, city, state, postalCode, type, website, lat, lon, currLat, currLon}){
    
    // https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
    function getDistanceFromLatLonInKm() {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(currLat-lat);  // deg2rad below
        var dLon = deg2rad(currLon-lon); 
        var a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(deg2rad(currLat)) * Math.cos(deg2rad(lat)) * 
          Math.sin(dLon/2) * Math.sin(dLon/2)
          ; 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // Distance in km
        return d.toFixed(2);
      }
      
    function deg2rad(deg) {
      return deg * (Math.PI/180)
    }
    
    return (
        <tr>
            <td>{name}</td>
            <td>{`${address}, ${city}, ${state}, ${postalCode}`}</td>
            <td>{type}</td>
            <td>{website}</td>
            <td>{getDistanceFromLatLonInKm()}</td>
        </tr>
    );
}


export default BreweryItem;