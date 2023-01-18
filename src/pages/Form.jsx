import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Place from '../components/Place';
import Map from '../components/Map';
import Photo from '../api/PixabayApi'
import { Context } from '../components/userContext';
import useInput from '../hooks/useInput';
import { setFormStep1, setFormStep2, setFormStep3, setProgressBar } from '../utils/index';
import { getPlacesData } from '../api/TravelApi';
import ClockLoader from 'react-spinners/ClockLoader ';

function Form() {
	const {
		formData,
		handleChange,
		exploreBtn,
		addTripItems,
		getPlaces,
		placesData,
		setPlacesData,
		step,
		setStep,
		isReady,
		setIsReady,
		resetInput,
		setSavedAttractions,
		setSavedRestaurants,	
		setTripNumber,
		coordinates,
		setCoordinates
	} = useContext(Context);

	// console.log(formData);
	// console.log(placesData);

	
	const [search, setSearch] = useState(false);
	const [showForm, setShowForm]=useState(true)

	function handleStep(e) {
		setPlacesData([]);
		e.preventDefault();
		setStep(prevStep => {
			if (prevStep < 3) {
				return prevStep + 1;
			} else return 1;
		});
		if (step === 1) {			
			getPlaces(getPlacesData('attractions', coordinates));
		} else if (step === 2) {
			getPlaces(getPlacesData('restaurants', coordinates));
		}
	}

	function handleSearch(e) {
		e.preventDefault();
		setSearch(prevSearch => !prevSearch);
	}

	const places = placesData.map((place, index) => {
		return <Place key={index} {...place} />;
	});
	// console.log(places);

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(position => {
			formData.direction === '' && setCoordinates(prevCoordinates =>
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

	const tomorrow  = new Date()
	tomorrow.setDate(tomorrow.getDate()+1);	
	const minDate = tomorrow.toISOString().split("T")[0]

	return (
		<div>
			<Header />
			<div className='form'>
				<form className={!showForm ? 'active' : ''}>
					<div onClick = {()=>setShowForm(prev=> !prev)}className="drag-icon"><i className="fa-solid fa-grip-lines-vertical"></i></div>
					<Photo destination = {formData.direction}/>
					{step === 1 ? (
						<div className='form-item'>
							<div className='input-box'>
								<label htmlFor='tripName'>Trip name</label>
								<input type='text' name='tripName' onChange={e => handleChange(e)} value={formData.tripName} maxLength="20" />
							</div>
							<div className='input-box'>
								<label htmlFor='startDate'>Start: </label>
								<input
									type='date'
									name='startDate'
									id='start-date'
									onChange={e => handleChange(e)}
									value={formData.startDate}
									min= {minDate}
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
									min= {formData.startDate || minDate}
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
									min="1"
								/>
							</div>
						</div>
					) : step === 2 ? (
						<div className='form-item'>
							<h2 className='form-header'>Find attractions</h2>
							<div className='place-box'>
								{placesData.length ? (
									places
								) : (
									<div>
										<ClockLoader color='#17e1a1' size={120} />
										<h4>
											just a second <i className='fa-regular fa-clock'></i>
										</h4>
									</div>
								)}
							</div>
						</div>
					) : (
						step === 3 && (
							<div className='form-item'>
								<h2 className='form-header'>Find restaurants</h2>
								<div className='place-box'>
									{placesData.length ? (
										places
									) : (
										<div>
											<ClockLoader color='#17e1a1' size={120} />
											<h4>
												just a second <i className='fa-regular fa-clock'></i>
											</h4>
										</div>
									)}
								</div>
							</div>
						)
					)}

					{step === 3 ? (
						<Link to='/finish'>
							<button
								onClick={() => {
									setIsReady(false);
									setStep(1);
									setPlacesData([]);
									resetInput()
									addTripItems()
									setSavedAttractions([])
									setSavedRestaurants([])
									setTripNumber(prevNumber=>prevNumber+1)
								}}
								className='form-btn'>
								add trip
							</button>
						</Link>
					) : (
						<button
							disabled={!isReady && true}
							onClick={e => {
								handleSearch(e);
								handleStep(e);
							}}
							className='form-btn'>
							{!isReady ? 'Please choose destination and hit "EXPLORE"' : 'Next'}
						</button>
					)}

					<div className='progres-box'>
						<div className='progres-bar' style={styles}></div>
						<div className={setFormStep1(step)}>{step > 1 ? <i className='fa-solid fa-check'></i> : 1}</div>
						<div className={setFormStep2(step)}>{step > 2 ? <i className='fa-solid fa-check'></i> : 2}</div>
						<div className={setFormStep3(step)}>{step > 3 ? <i className='fa-solid fa-check'></i> : 3}</div>
					</div>
				</form>
				<Map coordinates={coordinates} />
			</div>
			<Footer />
		</div>
	);
}

export default Form;
