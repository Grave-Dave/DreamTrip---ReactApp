import React from 'react';
import { Link } from 'react-router-dom';
import Confetti from 'react-confetti';

function FormFinish() {
	return (
		<div className='finish'>
			<Confetti />
			<h1>YAY! You've planned your trip! Now you can check it on the home page!</h1>
			<Link to ='/'>
				<h2 >Go to home page!</h2>
			</Link>
		</div>
	);
}

export default FormFinish;
