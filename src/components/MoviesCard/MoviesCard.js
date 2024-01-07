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

const SURL = 'https://api.nomoreparties.co'

	return (
		<>
			<article className='card'>
				<a className='card__link' href={movie.trailerLink} target="_blank" rel="noreferrer">
					<div className='card__info'>
						<h2 className='card__title'>{movie.nameRU}</h2>
						<p className='card__duration'>{formatTime(movie.duration)}</p>
					</div>
					<img className='card__image' alt={movie.nameRU} src={isSavedMovies ? movie.image : SURL + movie.image.url} />
				</a>
				{pathname === '/movies' ? (
					<button type="button" className={`card__button card__button_type${isSaved ? '_is-saved' : '_save'}`} onClick={handleOnClick}>{isSaved ? "" : "Сохранить"}</button>
				) : (
					<button onClick={handleOnClick} className="card__button card__button_type_delete"></button>
				)}
			</article>
		</>
	);
}

export default MoviesCard;