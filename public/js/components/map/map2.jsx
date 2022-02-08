import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

function MapContainer(google, props, locations=[]) {
  let styles = {
    height: '80px',
    width: '80px',
  };

  return (
    <Map
      google={google}
      containerStyle={{
        position: 'static',
        width: '60%',
        height: '60%',
      }}
      style={{
        width: '60%',
        height: '60%',
      }}
      center={locations[0]}
      initialCenter={locations[0]}
      zoom={locations.length === 1 ? 18 : 13}
      disableDefaultUI={true}
    >
      <Marker onClick={onMarkerClick} name={'Current location'} />
      <InfoWindow onClose={onInfoWindowClose}>
        <div>
          <h1>Here I am</h1>
        </div>
      </InfoWindow>
    </Map>
  );
}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyDEESDHH5eK0sWqC_atTCk00YawfDJX9iQ',
})(MapContainer);
