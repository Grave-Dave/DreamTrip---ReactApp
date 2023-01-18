import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../components/userContext';
import cloud from '../img/weather/cloud.png';
import drizzle from '../img/weather/drizzle.png';
import fog from '../img/weather/fog.png';
import ice from '../img/weather/ice.png';
import rain from '../img/weather/rain.png';
import sun from '../img/weather/sun.png';
import thunderstorm from '../img/weather/thunderstorm.png';
import unknown from '../img/weather/unknown.png';

export default function Weather(props) {
    console.log(props);
	const {} = useContext(Context);
	const [weather, setWeather] = useState(0);
	console.log(weather);

	useEffect(() => {
		fetch(
			`https://api.openweathermap.org/data/2.5/forecast?lat=${props.coords.lat}&lon=${props.coords.lng}&appid=${
				import.meta.env.VITE_WEATHER_API_KEY
			}&units=metric`
		)
			.then(res => res.json())
			.then(data => {
				setWeather({
					weather: data.list[props.day].weather[0].id,
					temp: Math.floor(data.list[props.day].main.temp),
					hum: data.list[props.day].main.humidity,
					date: (data.list[props.day].dt_txt).split(' ')[0],
				});
				console.log(data);
			});
	}, []);

	return (
		<div className='weather-item'>
			<h4 className='weather-date'>{weather.date}</h4>
			<img
				src={
					weather.weather >= 200 && weather.weather <= 232
						? thunderstorm
						: weather.weather >= 300 && weather.weather <= 321
						? drizzle
						: weather.weather >= 500 && weather.weather <= 531
						? rain
						: weather.weather >= 600 && weather.weather <= 622
						? ice
						: weather.weather >= 700 && weather.weather <= 781
						? fog
						: weather.weather === 800
						? sun
						: weather.weather >= 801 && weather.weather <= 804
						? cloud
						: unknown
				}
				width='50px'
			/>
			<p>
				<i className='fa-solid fa-temperature-half'></i> {weather.temp}
				<sup>o</sup>C
			</p>
			<p>
				<i className='fa-solid fa-droplet'></i> {weather.hum}%
			</p>
		</div>
	);
}
