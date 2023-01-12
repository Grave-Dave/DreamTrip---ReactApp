import { useState, useEffect, useRef } from 'react';

export default function useInput() {
	const [formData, setFormData] = useState({
		direction: '',
		tripName: '',
		startDate: '',
		endDate: '',
		travelers: '',
	});

	function handleChange(e) {
		const { name, value } = e.target;
		setFormData(prevFormData => {
			return {
				...prevFormData,
				[name]: value,
			};
		});
	}

	function resetInput() {
		setFormData({
			direction: '',
			tripName: '',
			startDate: '',
			endDate: '',
			travelers: '',
		});
	}

	function takeExploreInput(data) {
		setFormData(prevFormData => ({
			...prevFormData,
			direction: data.direction,
		}));
	}

	return {formData, handleChange, takeExploreInput, resetInput};
}
