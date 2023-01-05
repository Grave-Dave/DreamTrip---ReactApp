import { useState, useEffect, useRef } from 'react';

export default function useInput(){

    const [formData, setFormData] = useState({
        direction: '',
        name:'',
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
