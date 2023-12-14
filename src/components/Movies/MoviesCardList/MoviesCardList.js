import React, { useState } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import movieCardData from '../MovieCardData/MovieCardData';

function MoviesCardList({ handleSaveMovie }) {
	const movies = movieCardData;
	const [visibleMovies, setVisibleMovies] = useState(5);
	const handleShowMoreClick = () => {
		setVisibleMovies(visibleMovies + 2);
	};
	const moviesToDisplay = movies.slice(0, visibleMovies);

	return (
		<section className="movies-card-list">
			<div className='movies-card-list__content'>
				{moviesToDisplay.map((movie) => (
					<MoviesCard key={movie.id} movie={movie} handleSaveMovie={handleSaveMovie} />
				))}
			</div>
			{visibleMovies < movies.length && (
				<button className="movies-card-list__button" onClick={handleShowMoreClick}>Ещё</button>
			)}
		</section>
	);
}

export default MoviesCardList;
