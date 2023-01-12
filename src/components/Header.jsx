import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from './userContext';

function Header() {
	const { formData, handleChange, handleExplore, step, isHome, setIsHome, setIsReady } = useContext(Context);

	return (
		<div className='header'>
			{!isHome && (
				<Link to='/'>
					<i onClick={() => setIsHome(true)} className='fa-solid fa-arrow-left'></i>
				</Link>
			)}
			<Link to='/'>
				<h1 onClick={() => setIsHome(true)} className='header__title'>
					Dream Trip
				</h1>
			</Link>
			<div className='header__wrapper'>
				<div className='header__input'>
					<label className='header__input--label' htmlFor='destination'>
						{step === 1
							? 'Where do you want to go?'
							: step === 2
							? 'What do you want to see?'
							: 'Where do you want to eat?'}
					</label>
					<input
						onChange={e => handleChange(e)}
						value={formData.direction}
						name='direction'
						className='header__input--box'
						type='text'
						id='destination'
						placeholder='&#xF002; Type here'
						style={{ fontFamily: 'Montserrat' + ',' + 'FontAwesome' }}
						disabled={step > 1 && true}
					/>
					<Link to='/form'>
						<button
							onClick={() => {
								handleExplore();
								formData.direction && setIsReady(true);
								!formData.direction && setIsReady(false);
								setIsHome(false);
							}}
							className='header__input--btn'>
							Explore
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Header;
