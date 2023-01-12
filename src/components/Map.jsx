import React, { useState, useContext } from 'react';
import { GoogleMap, useLoadScript, MarkerF, InfoWindowF } from '@react-google-maps/api';
import { Context } from './userContext';
import { useEffect } from 'react';
import icon from '../img/ordynary.png';
import icon2 from '../img/hovered.png';
import icon3 from '../img/chosen.png';

const containerStyle = {
	width: '100%',
	height: '900px',
};

function Map({ coordinates }) {
	const { placesData, setPlacesData, saveAttractions, saveRestaurants, step, hover } = useContext(Context);

	function handleShowing(id) {
		setPlacesData(prevPlaceData => {
			return prevPlaceData.map(place => {
				return place.id === id
					? {
							...place,
							isShowing: !place.isShowing,
					  }
					: place;
			});
		});
	}

	let markers = placesData.map(place => {
		return (
			<div>
				<MarkerF
					key={place.id}
					position={{ lat: Number(place.latitude), lng: Number(place.longitude) }}
					title={place.name}
					onClick={() => {
						step === 2 ? saveAttractions(place) : step === 3 && saveRestaurants(place);
					}}
					onMouseOver={() => {
						hover(place.name);
						handleShowing(place.id);
					}}
					onMouseOut={() => {
						hover(place.name);
						handleShowing(place.id);
					}}
					options={place.isHovered ? { icon: icon2 } : place.isSaved ? { icon: icon3 } : { icon: icon }}
				/>
				{place.isShowing && (
					<InfoWindowF
						key={place.id + 1}
						position={{ lat: Number(place.latitude), lng: Number(place.longitude) }}
						onCloseClick={() => {
							handleShowing(place.id);
							hover(place.name);
						}}
						options={{ pixelOffset: new window.google.maps.Size(0, -20) }}
						anchor={<MarkerF position={{ lat: Number(place.latitude), lng: Number(place.longitude) }} />}>
						<div className='info-window'>
							<h3>{place.name}</h3>
							<img src={place.photo && place.photo.images.medium.url} />
							<div className='info-rank-box'>
								<p className='place-rank'>
									rating: <i className='fa-regular fa-star'></i> {place.rating ? place.rating : '-'}
								</p>
								<p className='place-rank'>
									reviews: <i className='fa-regular fa-circle-user'></i> {place.num_reviews ? place.num_reviews : '-'}
								</p>
								
							</div>
						</div>
					</InfoWindowF>
				)}
			</div>
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
