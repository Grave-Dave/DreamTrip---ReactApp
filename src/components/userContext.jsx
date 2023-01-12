import React, { useState, useEffect } from 'react';
import useInput from '../hooks/useInput';
import { nanoid } from 'nanoid';

const Context = React.createContext();

function userContext(props) {
	const { formData, handleChange, resetInput } = useInput();
	const [tripItems, setTripItems] = useState([]);
	const [exploreBtn, setExploreBtn] = useState(false);
	const [isHome, setIsHome] = useState(false);
	const [isReady, setIsReady] = useState(false);
	const [placesData, setPlacesData] = useState([]);
	const [step, setStep] = useState(1);
	const [savedAttractions, setSavedAttractions] = useState([]);
	const [savedRestaurants, setSavedRestaurants] = useState([]);

	console.log(savedAttractions);

	async function getPlaces(data) {
		const placedata = await data;
		const placeDataWithId = placedata.map(data => ({ ...data, id: nanoid(), isSaved: false }));
		setPlacesData(placeDataWithId);
		removeEmpty();
	}

	function handleSaved(item){
		setSavedAttractions(prev => {
			let index;
			console.log('tablica0 ')
			console.log(prev)
			if (prev.length === 0) {
				return [item];
			} 
			console.log('tablica1 ')
			console.log(prev)
			if ( prev.length > 0 &&
				prev
					.map((place, i) => {
						console.log('check');
						if (place.id === item.id) {
							index = i;
							console.log(index)
							return false;
						} else return true;
					})
					.reduce((a, b) => a * b)
			){
				return [...prev, item]
			} else{
				console.log('index2 ' + index);
				console.log('tablica2')
				console.log(prev)
				return prev.splice(index, 1)
			}

		});
		
	}

	function saveAttractions(item, e) {
		e && e.preventDefault();

		setSavedAttractions(prev=>[...prev, item])

		handleSaved(item)

		



				// return prev.length === 0
				// 	? [item]
				// 	: prev
				// 			.map((place, i) => {
				// 				console.log('check');
				// 				if (place.id === item.id) {
				// 					index = i;
				// 					console.log(index);
				// 					return false;
				// 				} else return true;
				// 			})
				// 			.reduce((a, b) => a * b)
				// 	? [...prev, item]
				// 	: prev.splice(index, 1);
		

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

	function saveRestaurants(item, e) {
		e && e.preventDefault();
		setSavedRestaurants(prev => [...prev, item]);
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

	function handleExplore() {
		setExploreBtn(prevExploreBtn => !prevExploreBtn);
	}

	function addItems(item) {
		setTripItems(prevTripItems => [...prevTripItems, item]);
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
				addItems,
				resetInput,
				handleExplore,
				handleChange,
				setPlacesData,
				getPlaces,
				setStep,
				setIsHome,
				hover,
				saveAttractions,
				setIsReady,
			}}>
			{props.children}
		</Context.Provider>
	);
}

export { userContext as UserContextProvider, Context };
