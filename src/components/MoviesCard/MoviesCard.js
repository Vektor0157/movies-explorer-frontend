import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';

function MoviesCard({ movie, isSavedMovies, handleIsSavedToogle, checkIsSaved }) {
	const [isSaved, setIsSaved] = useState(false);
	const { pathname } = useLocation();

	const handleOnClick = (e) => {
		 handleIsSavedToogle(e, movie, setIsSaved, isSaved);
	};

	useEffect(() => {
		 if (!isSavedMovies) {
			  if (checkIsSaved(movie)) {
					setIsSaved(true);
			  } else {
					setIsSaved(false);
			  }
		 }
	}, [checkIsSaved, movie, isSavedMovies]);

	const formatTime = (minutes) => {
		 const min = minutes % 60;
		 const hour = Math.floor(minutes / 60);
		 return hour ? `${hour}ч ${min}м` : `${min}м`;
	};

	return (
		<div className="movie-card">
			<a href={movie.trailerLink} target="_blank" rel="noopener noreferrer" className='card__link'>
				<div className='movie-card__content'>
					<div className='movie-card__description'>
						<h2 className="movie-card__title">{movie.nameRU}</h2>
						<p className="movie-card__duration">{(formatTime(movie.duration))}</p>
					</div>
					<img className="movie-card__image" src={`https://api.nomoreparties.co${movie.image.url}`} alt={movie.nameRU}/>
				</div>
			</a>
			{pathname === '/movies' ? (
				<button type="button" className={`movie-card__button movie-card__button_type${isSaved ? '_is-saved' : '_save'}`} onClick={handleOnClick}>{isSaved ? "" : "Сохранить"}</button>
			) : (
				<button onClick={handleOnClick} className="movie-card__button movie-card__button-type-delete"></button>
			)}
		</div>
	);
}

export default MoviesCard;