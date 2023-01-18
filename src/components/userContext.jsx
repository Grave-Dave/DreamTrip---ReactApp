import React, { useState, useEffect } from 'react';
import useInput from '../hooks/useInput';
import { nanoid } from 'nanoid';

const Context = React.createContext();

function userContext(props) {
	const { formData, handleChange, resetInput } = useInput();
	const [tripItems, setTripItems] = useState(JSON.parse(localStorage.getItem('trips')) || [
		{
			number: 0,
			photo:
				'https://images.unsplash.com/photo-1563789031959-4c02bcb41319?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
			formData: {
				direction: 'Santorini',
				tripName: 'Majówka w Santorini',
				startDate: '2023-05-01',
				endDate: '2023-05-07',
				travelers: '2',
			},
			attractions: [],
			restaurants: [],
		},
	]);
	const [tripNumber, setTripNumber] = useState(JSON.parse(localStorage.getItem('trips')) && JSON.parse(localStorage.getItem('trips')).length>0 ? JSON.parse(localStorage.getItem('trips')).slice(-1)[0].number+1 : 1)
	const [exploreBtn, setExploreBtn] = useState(false);
	const [currentPhoto, setCurrentPhoto] = useState(false);
	const [isHome, setIsHome] = useState(false);
	const [isReady, setIsReady] = useState(false);
	const [placesData, setPlacesData] = useState([]);
	const [step, setStep] = useState(1);
	const [savedAttractions, setSavedAttractions] = useState([]);
	const [savedRestaurants, setSavedRestaurants] = useState([]);

	console.log(savedAttractions);
	console.log(savedRestaurants);
	console.log(tripItems);
	console.log(formData);
	console.log(tripNumber)

	async function getPlaces(data) {
		const placedata = await data;
		const placeDataWithId = placedata.map(data => ({ ...data, id: nanoid(), isSaved: false }));
		setPlacesData(placeDataWithId);
		removeEmpty();
	}

	function handleIsSavedAtribute(item) {
		setPlacesData(prevPlaceData =>
			prevPlaceData.map(place =>
				place.id === item.id
					? {
							...place,
							isSaved: !place.isSaved,
					  }
					: place
			)
		);
	}

	function saveAttractions(item, e) {
		e && e.preventDefault();

		setSavedAttractions(prev => {
			let index;
			return prev.length === 0
				? [item]
				: prev
						.map((place, i) => {
							if (place.id === item.id) {
								index = i;
								return false;
							} else return true;
						})
						.reduce((a, b) => a * b)
				? [...prev, item]
				: prev.splice(index, 1) && prev;
		});

		handleIsSavedAtribute(item);
	}

	function saveRestaurants(item, e) {
		e && e.preventDefault();

		setSavedRestaurants(prev => {
			let index;
			return prev.length === 0
				? [item]
				: prev
						.map((place, i) => {
							if (place.id === item.id) {
								index = i;
								return false;
							} else return true;
						})
						.reduce((a, b) => a * b)
				? [...prev, item]
				: prev.splice(index, 1) && prev;
		});

		handleIsSavedAtribute(item);
	}

	function removeEmpty() {
		setPlacesData(prevPlaceData => {
			return prevPlaceData.filter(place => place.name);
		});
	}

	function hover(name) {
		setPlacesData(prevPlaceData => {
			return prevPlaceData.map(place => {
				return place.name === name
					? {
							...place,
							isHovered: !place.isHovered,
					  }
					: place;
			});
		});
	}

	useEffect(()=>{
		console.log(tripItems.length)
		tripItems.length ? setTripNumber(tripItems.slice(-1)[0].number+1) : setTripNumber(1)
	},[tripItems])
	

	function handleExplore() {
		setExploreBtn(prevExploreBtn => !prevExploreBtn);
	}

	function addTripItems() {
		setTripItems(prevTripItems => {
			return [
				...prevTripItems,
				{
					number: tripNumber,
					photo: currentPhoto,
					formData: formData,
					attractions: savedAttractions,
					restaurants: savedRestaurants,
				},
			];
		});
	}

	function removeTripItems(id) {
		setTripItems(prevTrips => {
			return prevTrips.filter(trip => {
				return trip.number !== id;
			});
		});
	}

	return (
		<Context.Provider
			value={{
				step,
				tripItems,
				exploreBtn,
				formData,
				placesData,
				isHome,
				isReady,
				addTripItems,
				resetInput,
				handleExplore,
				handleChange,
				setPlacesData,
				getPlaces,
				setStep,
				setIsHome,
				hover,
				saveAttractions,
				saveRestaurants,
				setSavedAttractions,
				setSavedRestaurants,
				setIsReady,
				currentPhoto,
				setCurrentPhoto,
				setTripNumber,
				removeTripItems,
			}}>
			{props.children}
		</Context.Provider>
	);
}

export { userContext as UserContextProvider, Context };
