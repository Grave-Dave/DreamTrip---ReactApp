import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from './userContext';


function Header() {

	const {formData, handleChange, handleExplore} = useContext(Context)

// console.log(formData)
	return (
		<div className='header'>
			<Link to='/'>
				<h1 className='header__title'>Dream Trip</h1>
			</Link>
			<div className='header__wrapper'>
				<div className='header__input'>
					<label className='header__input--label' htmlFor='destination'>
						Where do you want to go?
					</label>
					<input
						onChange={e=>handleChange(e)}
						value={formData.direction}
						name='direction'
						className='header__input--box'
						type='text'
						id='destination'
						placeholder='&#xF002; Type here'
						style={{ fontFamily: 'Montserrat' + ',' + 'FontAwesome' }}
					/>
					<Link to='/form'>
						<button onClick={handleExplore} className='header__input--btn'>Explore</button>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Header;
