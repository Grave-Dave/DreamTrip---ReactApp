import { useState, useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';

export default function useInput(){

    const [formData, setFormData] = useState({
        id: nanoid(),
        direction: '',
        tripName:'',
        startDate:'',
        endDate:'',
        travelers:''
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

    function takeExploreInput(data) {
        setFormData(prevFormData=>({
            ...prevFormData,
            direction: data.direction
        }))
    }

    return [formData, handleChange, takeExploreInput]
}
