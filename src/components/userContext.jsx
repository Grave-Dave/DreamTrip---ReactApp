import React, { useState, useEffect } from 'react';
import useInput from '../hooks/useInput';

const Context = React.createContext();

function userContext(props) {
	const [formData, handleChange] = useInput();
	const [tripItems, setTripItems] = useState([]);
	const [exploreBtn, setExploreBtn] = useState(false);
	const [placesData, setPlacesData] = useState([]);

	async function getPlaces(data) {		
        const placedata = await data
		setPlacesData(placedata);
	}
    function hover(name){
        setPlacesData(prevPlaceData=>{
            return prevPlaceData.map(place=>{
                return place.name === name ? {
                    ...place,
                    isHovered: !place.isHovered
                } : place
            })
        })
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
				tripItems,
				exploreBtn,
				formData,
				placesData,                
				addItems,
				handleExplore,
				handleChange,
                setPlacesData,
				getPlaces,
                hover
                
			}}>
			{props.children}
		</Context.Provider>
	);
}

export { userContext as UserContextProvider, Context };
