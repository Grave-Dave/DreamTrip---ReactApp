import React from 'react';
import { Link } from 'react-router-dom';
import cloud from '../img/weather/cloud.png';

function Trip(props) {
	return (
		<div className='trip-page'>
			<Link to='/'>
				<i className='fa-solid fa-arrow-left'></i>
			</Link>
			<div className='trip-page-header'>
				<h1 className='trip-page-title'>Your trip to Barcelona</h1>
				<h2 className='trip-page-date'>01-02-2023 - 14-02-2023</h2>
			</div>
			<div className='main-info'>
				<div className='img-box'>
					<img src="https://images.unsplash.com/photo-1563789031959-4c02bcb41319?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80'" />
				</div>
				<div className='main-info-text'>
					<h2>Podsumowanie podróży</h2>
					<p>
						Kierunek: <span className='bolder'>Barcelona</span>{' '}
					</p>
					<p>
						Liczba uczestników: <span className='bolder'>2</span>
					</p>
					<p>
						Do wyjazdu pozostało: <span className='bolder'>10 dni</span>
					</p>
					<p>
						Czas podróży: <span className='bolder'>5 dni</span>
					</p>
				</div>

				{/* Poniżej każdy element pogodowy przedstawić w oddzielnym komponencie <Weather /> */}

				<div className='weather'>
					<h3>Prognozowane warunki pogodowe</h3>
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

				<div className='attraction'>
					<h3>Twoje atrakcje</h3>
					<div className='attraction-box'>
						<div className='attraction-item'>attraction 1</div>
						<div className='attraction-item'>attraction 2</div>
						<div className='attraction-item'>attraction 3</div>
					</div>
				</div>
				<div className='attraction'>
					<h3>Twoje restauracje</h3>
					<div className='restaurant-box'>
						<div className='restaurant-item'>restaurant 1</div>
						<div className='restaurant-item'>restaurant 2</div>
						<div className='restaurant-item'>restaurant 3</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Trip;
