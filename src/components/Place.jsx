import React, { useContext, useEffect } from 'react';
import { Context } from './userContext';
import img from '../img/restaurant.png';
import img2 from '../img/attraction.png';
import img3 from '../img/picture.png';

export default function Place(props) {
	// console.log(props)

	const { hover } = useContext(Context);
	return (
		<div>
			<div onMouseEnter={() => hover(props.name)} onMouseLeave={() => hover(props.name)} className={'place-item'}>
				<h3 className='place-header'>{props.name}</h3>
				<img
					className='place-img'
					src={
						props.photo
							? props.photo.images.medium.url
							: props.category && props.category.name === 'Restaurant'
							? img
							: props.category && props.category.name === 'Attraction'
							? img2
							: img3
					}
					alt='hotel'
				/>
				<div className='rank-box'>
					<p className='place-rank'>
						rating: <i class='fa-regular fa-star'></i> {props.rating ? props.rating : '-'}
					</p>
					<p className='place-rank'>
						reviews: <i class='fa-regular fa-circle-user'></i> {props.num_reviews ? props.num_reviews : '-'}
					</p>
				</div>
				<button className='place-btn'>Add</button>
			</div>
		</div>
	);
}
