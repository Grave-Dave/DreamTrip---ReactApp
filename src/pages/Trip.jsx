import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import cloud from '../img/weather/cloud.png';
import TripDetails from '../components/TripDetails';
import { Context } from '../components/userContext';

function Trip(props) {
	const { tripItems } = useContext(Context);

	const { tripId } = useParams();

	const thisTrip = tripItems.find(trip => trip.number === Number(tripId));

	const travelTimeInMs = Date.parse(thisTrip.formData.endDate) - Date.parse(thisTrip.formData.startDate);
	const travelTimeInDays = (travelTimeInMs / 1000 / 60 / 60 / 24)+1;
	const date = new Date();
	const daysToGo = Math.floor((Date.parse(thisTrip.formData.startDate) - date.getTime()) / 1000 / 60 / 60 / 24);
	const hoursToGo = Math.floor(((Date.parse(thisTrip.formData.startDate) - date.getTime()) / 1000 / 60 / 60) % 24);
	const minutesToGo = Math.floor(((Date.parse(thisTrip.formData.startDate) - date.getTime()) / 1000 / 60) % 60);

	const attractions = thisTrip.attractions.map(attraction => {
		return <TripDetails key={attraction.id} {...attraction} />;
	});
	const restaurants = thisTrip.restaurants.map(restaurant => {
		return <TripDetails key={restaurant.id} {...restaurant} />;
	});

	console.log(attractions);

	return (
		<div className='trip-page'>
			<Link to='/'>
				<i className='fa-solid fa-arrow-left'></i>
			</Link>
			<div className='trip-page-header'>
				<h1 className='trip-page-title'>{`Your trip to ${thisTrip.formData.direction}`}</h1>
				<h2 className='trip-page-date'>{`${thisTrip.formData.startDate} - ${thisTrip.formData.endDate}`}</h2>
			</div>
			<div className='main-info'>
				<div className='img-box'>
					<img src={thisTrip.photo} />
				</div>
				<div className='main-info-text'>
					<h2>Trip summary</h2>
					<p>
						Direction: <span className='bolder city'>{thisTrip.formData.direction}</span>
					</p>
					<p>
						Number of participants: <span className='bolder'>{thisTrip.formData.travelers}</span>
					</p>
					<p>
						Time to go:{' '}
						<span className='bolder'>{`${daysToGo ? daysToGo : '0'} days ${hoursToGo ? hoursToGo : '0'} hours ${
							minutesToGo ? minutesToGo : '0'
						} minutes`}</span>
					</p>
					<p>
						Travel time: <span className='bolder'>{`${travelTimeInDays && travelTimeInDays>0 ? travelTimeInDays : '0'} days`}</span>
					</p>
				</div>

				{/* Poniżej każdy element pogodowy przedstawić w oddzielnym komponencie <Weather /> */}

				<div className='weather'>
					<h3>Expected weather conditions</h3>
					<div className='weather-box'>
						<div className='weather-item'>
							<h4 className='weather-date'>01-02-2023</h4>
							<img src={cloud} width='50px' />
							<p>
								17<sup>o</sup>C
							</p>
						</div>
						<div className='weather-item'>
							<h4 className='weather-date'>02-02-2023</h4>
							<img src={cloud} width='50px' />
							<p>
								17<sup>o</sup>C
							</p>
						</div>
						<div className='weather-item'>
							<h4 className='weather-date'>03-02-2023</h4>
							<img src={cloud} width='50px' />
							<p>
								17<sup>o</sup>C
							</p>
						</div>
						<div className='weather-item'>
							<h4 className='weather-date'>04-02-2023</h4>
							<img src={cloud} width='50px' />
							<p>
								17<sup>o</sup>C
							</p>
						</div>
						<div className='weather-item'>
							<h4 className='weather-date'>05-02-2023</h4>
							<img src={cloud} width='50px' />
							<p>
								17<sup>o</sup>C
							</p>
						</div>
					</div>
				</div>

				{/* Poniżej każdą atrakcję i restauracje przedstawić w oddzielnym komponencie <Attraction /> */}

				{attractions.length && <div className='attraction'>
					<h3>Your attractions:</h3>
					<div className='attraction-box'>{attractions}</div>
				</div>}
				{restaurants.length && <div className='attraction'>
					<h3>Your restaurants:</h3>
					<div className='attraction-box'>{restaurants}</div>
				</div>}
			</div>
		</div>
	);
}

export default Trip;
