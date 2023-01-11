import axios from 'axios';

export const getPlacesData = async (type, coords) => {
	const lat = Number(coords.lat);
	const lng = Number(coords.lng);
	console.log('api call');

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
				'X-RapidAPI-Key': 'afc5704113mshdd6a281c8e9053ap185d00jsn00dd7db65ce2',
				'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
			},
		});
		console.log(data);
		return data;
	} catch (error) {
		console.log(error);
	}
};
