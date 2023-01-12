import React, { useContext, useEffect } from 'react';
import { Context } from './userContext';
import img from '../img/restaurant.png';
import img2 from '../img/attraction.png';
import img3 from '../img/picture.png';

export default function Place(props) {
	const { hover, saveAttractions, step } = useContext(Context);
	return (
		<div>
			<div
				onMouseEnter={() => hover(props.name)}
				onMouseLeave={() => hover(props.name)}
				className={props.isSaved ? 'place-item active' : 'place-item'}>
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
						rating: <i className='fa-regular fa-star'></i> {props.rating ? props.rating : '-'}
					</p>
					<p className='place-rank'>
						reviews: <i className='fa-regular fa-circle-user'></i> {props.num_reviews ? props.num_reviews : '-'}
					</p>
					{props.cuisine && (
						<p className='place-details'>
							<i className='fa-solid fa-utensils'></i> {props.cuisine[0] && props.cuisine[0].name}
						</p>
					)}
				</div>
				<button
					onClick={e => {
						step === 2 ? saveAttractions(props, e) : step === 3 && saveRestaurants(props, e);
					}}
					className={props.isSaved ? 'place-btn saved' : 'place-btn'}>
					{props.isSaved ? <p>Remove <i className="fa-solid fa-trash"></i></p> : <p>Add <i className="fa-solid fa-plus"></i></p>  }
				</button>
			</div>
		</div>
	);
}
