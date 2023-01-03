import React from 'react';
import Header from '../components/Header';
import TripBox from '../components/TripBox';
import Footer from '../components/Footer';
import photo1 from '../img/photo1.png';
import photo2 from '../img/photo2.jpg';
import photo3 from '../img/photo3.png';

function Home() {
	return (
		<div>
			<Header />

			<main>
				<div className='content'>
					<div className='content-box'>
						<div className='image-box'>
							<div className='image-box__item one'>
								<img src={photo1} alt='man walking across mountains' />
								<h2 className='image-box-text'>Find destination</h2>
							</div>
							<div className='image-box__item two'>
								<h2 className='image-box-text'>Plan perfect journey</h2>
							</div>
							<div className='image-box__item three'>
								<img src={photo3} alt='man walking across mountains' />
								<h2 className='image-box-text'>Enjoy your trip!</h2>
							</div>
							<div className='shadow'></div>
						</div>

						<TripBox />
					
					</div>
				</div>
			</main>

			<Footer />
		</div>
	);
}

export default Home;
