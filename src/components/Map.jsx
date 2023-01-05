import React, {useState} from 'react'
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '850px'
};

function Map({coordinates}) {

  const { isLoaded } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  })

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={coordinates}
        zoom={12}
      >
        {coordinates && <MarkerF position={coordinates}/>}
      </GoogleMap>
  ) : <p>Loading...</p>
}

export default React.memo(Map)