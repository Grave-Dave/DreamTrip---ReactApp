import React from 'react';
import photo2 from '../img/photo2.jpg';

function TripItem(props) {
	return (		
			<div className='trip-box__item'>
				<h3 className='trip-box-text'>
					Trip 1 <i className='fa-solid fa-trash-can'></i>
				</h3>
				<div className='trip-info'>
					<img src={photo2} width='200px' />
					<div className='trip-details'>
						<h4>Destination: Barcelona</h4>
						<p>Chek-in: 01/02/2023</p>
						<p>Chek-out: 14/02/2023</p>
						<p>Click here for DETAILS</p>
					</div>
				</div>
			</div>		
	);
}

export default TripItem;
