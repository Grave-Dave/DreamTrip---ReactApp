import React, { useState, useEffect, useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Place from '../components/Place';
import Attraction from '../components/Attraction';
import Map from '../components/Map';
import { Context } from '../components/userContext';
import useInput from '../hooks/useInput';
import { setFormStep1, setFormStep2, setFormStep3, setProgressBar } from '../utils/index';
import { getPlacesData } from '../api/TravelApi';

function Form() {
	const { formData, handleChange, exploreBtn, addItems, tripItems, getPlaces, placesData, setPlacesData } = useContext(Context);
	console.log(formData);
	console.log(placesData);
	const [coordinates, setCoordinates] = useState({
		lat: 52.237,
		lng: 21.017,
	});

	const [step, setStep] = useState(1);

	const [search, setSearch] = useState(false);

	function handleStep(e) {
		setPlacesData([])
		e.preventDefault();
		setStep(prevStep => {
			if (prevStep < 3) {
				return prevStep + 1;
			} else return 1;
		});
		if (step === 1) {
			getPlaces(getPlacesData('attractions', coordinates));

			console.log('hotele');
		} else if (step === 2) {
			getPlaces(getPlacesData('restaurants', coordinates));
		}
		addItems(formData);
	}

	function handleSearch(e) {
		e.preventDefault();
		setSearch(prevSearch => !prevSearch);
	}

	const places = placesData.map((place, index) => {
		return <Place key={index} id={formData.id} {...place}/>;
	});
	console.log(places);

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(position => {
			setCoordinates(prevCoordinates =>
				position
					? {
							lat: position.coords.latitude,
							lng: position.coords.longitude,
					  }
					: prevCoordinates
			);
		});
	}, []);

	useEffect(() => {
		fetch(
			`https://maps.googleapis.com/maps/api/geocode/json?address=${formData.direction}&key=${
				import.meta.env.VITE_GOOGLE_MAPS_API_KEY
			}`
		)
			.then(res => {
				if (!res.ok) {
					throw Error('Please check, that the destination has been entered');
				}
				return res.json();
			})
			.then(data => {
				setCoordinates(prevCoordinates =>
					formData.direction && data.results[0] ? data.results[0].geometry.location : prevCoordinates
				);
				// console.log(data.results[0]);
			})
			.catch(err => console.error(err));
	}, [search, exploreBtn]);

	const styles = {
		width: setProgressBar(step),
	};

	return (
		<div>
			<Header />
			<div className='form'>
				<form>
					<div className='photo'></div>
					{step === 1 ? (
						<div className='form-item'>
							<div className='input-box'>
								<label htmlFor='tripName'>Trip name</label>
								<input type='text' name='tripName' onChange={e => handleChange(e)} value={formData.tripName} />
							</div>
							<div className='input-box'>
								<label htmlFor='startDate'>Start: </label>
								<input
									type='date'
									name='startDate'
									id='start-date'
									onChange={e => handleChange(e)}
									value={formData.startDate}
								/>
							</div>
							<div className='input-box'>
								<label htmlFor='endDate'>End: </label>
								<input
									type='date'
									name='endDate'
									id='end-date'
									onChange={e => handleChange(e)}
									value={formData.endDate}
								/>
							</div>
							<div className='input-box'>
								<label htmlFor='travelers'>Travelers: </label>
								<input
									type='number'
									name='travelers'
									id='travelers'
									onChange={e => handleChange(e)}
									value={formData.travelers}
								/>
							</div>
						</div>
					) : step === 2 ? (
						<div className='form-item'>
							<h2 className='form-header'>Find attractions</h2>
							<div className='place-box'>{placesData.length ? places : 'loading...'}</div>
						</div>
					) : (
						step === 3 && (
							<div className='form-item'>
								<h2 className='form-header'>Find restaurants</h2>
								<div className='place-box'>
								{placesData.length ? places : 'loading...'}
								</div>
							</div>
						)
					)}

					<button
						onClick={e => {
							if (step === 3) {
								handleStep(e);
							} else {
								handleSearch(e);
								handleStep(e);
							}
						}}
						className='form-btn'>
						{step === 3 ? 'add trip' : 'Next'}
					</button>
					<div className='progres-box'>
						<div className='progres-bar' style={styles}></div>
						<div className={setFormStep1(step)}>{step > 1 ? <i class='fa-solid fa-check'></i> : 1}</div>
						<div className={setFormStep2(step)}>{step > 2 ? <i class='fa-solid fa-check'></i> : 2}</div>
						<div className={setFormStep3(step)}>{step > 3 ? <i class='fa-solid fa-check'></i> : 3}</div>
					</div>
				</form>
				<Map coordinates={coordinates} />
			</div>
			<Footer />
		</div>
	);
}

export default Form;
