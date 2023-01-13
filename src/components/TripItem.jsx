import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { Context } from './userContext';

function TripItem({trip}) {

	const { removeTripItems } = useContext(Context)
	return (		
			<div className='trip-box__item'>
				<h3 className='trip-box-text'>
					{`Trip: ${trip.formData.tripName && trip.formData.tripName.length ? trip.formData.tripName : trip.number}`} <i onClick={()=>{removeTripItems(trip.number)}} className='fa-solid fa-trash-can'></i>
				</h3>
				<div className='trip-info'>
					<img src={trip.photo} width='200px' />
					<div className='trip-details'>
						<h4>Destination: <span>{trip.formData.direction}</span></h4>
						<p>{`Check-in: ${trip.formData.startDate}`}</p>
						<p>{`Check-out: ${trip.formData.endDate}`}</p>
						<Link to={`/${trip.number}`}><p>Click here for DETAILS</p></Link>
					</div>
				</div>
			</div>		
	);
}

export default TripItem;
