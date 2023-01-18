import React from 'react';
import img from '../img/restaurant.png';
import img2 from '../img/attraction.png';
import img3 from '../img/picture.png';

export default function TripDetails(props) {

	return (
		<div className='attraction-item'>
			<h1 className='attraction-heading'>{props.name}</h1>
			<img src={props.photo ? props.photo.images.medium.url
							: props.category && props.category.name === 'Restaurant'
							? img
							: props.category && props.category.name === 'Attraction'
							? img2
							: img3} alt='liked place image' />
			<div className='rank-box'>
				<p className='place-rank'>
					<i className='fa-regular fa-star'></i> rating: {props.rating}
				</p>
				<p className='place-rank'>
					<i className='fa-regular fa-circle-user'></i> reviews: {props.num_reviews}
				</p>
				{props.price && <p className='place-rank'>
					<i className='fa-solid fa-sack-dollar'></i> price: {props.price}
				</p>}
			</div>
			{props.booking && (
				<a href={props.booking.url} target='_blank'>
					{props.category.name === 'Restaurant' ? 'Order' : 'Buy ticket'}
				</a>
			)}

			<div className='attraction-description'>
				<h4>Address</h4>
				<p className={props.address ? '' : 'empty'}>{props.address ? props.address : '-'}</p>
			</div>

			<div className='attraction-description'>
				<h4>Description</h4>
				<p className={props.description ? '' : 'empty'}>{props.description ? props.description : '-'}</p>
			</div>
		</div>
	);
}
