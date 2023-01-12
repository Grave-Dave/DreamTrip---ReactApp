import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import TripItem from '../components/TripItem';
import Footer from '../components/Footer';
import photo1 from '../img/photo1.png';
import photo2 from '../img/photo2.jpg';
import photo3 from '../img/photo3.png';
import { Context } from '../components/userContext';

function Home() {

	const { isHome, setIsHome, setIsReady } = useContext(Context);
	const [expandImages, setExpandImages] = useState(false);

	console.log(isHome);

	useEffect(() => {
		setIsHome(true)
		setIsReady(false)
		function handleScroll() {
			window.scrollY > 0 && setExpandImages(true);
		}
		window.addEventListener('scroll', handleScroll);
		return ()=>{
			window.removeEventListener('scroll', handleScroll)
		}
	}, []);

	return (
		<div>
			<Header />

			<main>
				<div className='content'>
					<div className='content-box'>
						<div className={`image-box ${expandImages && 'active'}`}>
							<div className={`image-box__item one ${expandImages && 'active'}`}>
								<img src={photo1} alt='man walking across mountains' />
								<h2 className='image-box-text'>Find destination</h2>
							</div>
							<div className='image-box__item two'>
								<h2 className='image-box-text'>Plan perfect journey</h2>
							</div>
							<div className={`image-box__item three ${expandImages && 'active'}`}>
								<img src={photo3} alt='man walking across mountains' />
								<h2 className='image-box-text'>Enjoy your trip!</h2>
							</div>
							<div className={`shadow ${expandImages && 'active'}`}></div>
						</div>
						<div className='trip-box'>
							<div className='trip-heading'>
								<h2>Your trips</h2>
								<Link to='/form' onClick={()=>setIsHome(false)}>
									<p >
										add trip <i className='fa-solid fa-plus'></i>
									</p>
								</Link>
							</div>
							<div className='trip-items'>
								<TripItem />
							</div>
						</div>
					</div>
				</div>
			</main>

			<Footer />
		</div>
	);
}

export default Home;
