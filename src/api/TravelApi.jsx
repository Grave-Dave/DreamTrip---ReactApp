import axios from 'axios';

export const getPlacesData = async (type, coords) => {
	const lat = Number(coords.lat);
	const lng = Number(coords.lng);
	// console.log('api call');

	try {
		const {
			data: { data },
		} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
			params: {
				tr_longitude: `${lng + 0.07}`,
				tr_latitude: `${lat + 0.07}`,
				bl_longitude: `${lng - 0.07}`,
				bl_latitude: `${lat - 0.07}`,
			},
			headers: {
				'X-RapidAPI-Key': import.meta.env.VITE_TRAVEL_API_KEY,
				'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
			},
		});
		return data;
	} catch (error) {
		console.log(error);
	}
};
