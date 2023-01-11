import React, { useState, useContext } from 'react';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import { Context } from './userContext';
import { useEffect } from 'react';
import icon from '../img/ordynary.png'
import icon2 from '../img/chosen.png'

const containerStyle = {
	width: '100%',
	height: '850px',
};

function Map({ coordinates }) {
	const { placesData } = useContext(Context);
console.log(placesData);
	let markers = placesData.map(place => {
		return (
			<MarkerF
				position={{ lat: Number(place.latitude), lng: Number(place.longitude) }}
				title={place.name}
				options={place.isHovered ? {icon:icon2} : {icon:icon}}
        onTitleChanged={()=>console.log('hello')}
			/>
		);
	});

	const { isLoaded } = useLoadScript({
		id: 'google-map-script',
		googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
	});

	return isLoaded ? (
		<GoogleMap mapContainerStyle={containerStyle} center={coordinates} zoom={12}>
			{markers.length ? markers : <MarkerF position={coordinates} />}
		</GoogleMap>
	) : (
		<p>Loading...</p>
	);
}

export default Map;
