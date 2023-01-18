import React, { useContext, useEffect } from 'react';
import { Context } from '../components/userContext';
import photo from '../img/travel.jpg'

export default function Photo({destination}) {
	const { currentPhoto, setCurrentPhoto, exploreBtn } = useContext(Context);
console.log(currentPhoto);
	useEffect(() => {

        fetch(`https://pixabay.com/api/?key=${import.meta.env.VITE_PIXABAY_API_KEY}&q=${destination}&lang=pl`)
            .then(res=>res.json())
            .then(data=>{destination && setCurrentPhoto(data.hits[0] ? data.hits[0].webformatURL : photo); console.log(data.hits)})
			
    }, [exploreBtn]);
	return (
		<div className='photo'>
			<img src={currentPhoto ? currentPhoto : photo } alt='photo of destination' />
		</div>
	);
}
