import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
import saved from '../../../images/saved.svg';
import removeIcon from '../../../images/removeIcon.svg';

function MoviesCard({ movie }) {
	const location = useLocation();
	const [isSaved, setIsSaved] = useState(false);
	const [setIsRemoved] = useState(false);
	const isSavedMoviesPage = location.pathname === '/saved-movies';

	const handleSaveClick = (e) => {
		e.preventDefault();
		setIsSaved(true);
	};

	const handleRemoveClick = (e) => {
		e.preventDefault();
		setIsRemoved(true);
	};

	return (
		<div className="movie-card">
			<div className='movie-card__content'>
				<div className='movie-card__description'>
					<h2 className="movie-card__title">{movie.nameRU}</h2>
					<p className="movie-card__duration">{movie.duration}</p>
				</div>
				<img className="movie-card__image" src={movie.image} alt={movie.nameRU} />
				<form onSubmit={isSavedMoviesPage ? handleRemoveClick : handleSaveClick}>
				{isSavedMoviesPage ? (
					<button type="submit" className="movie-card__remove-icon">
						<img className="movie-card__remove-icon-img" src={removeIcon} alt="удалить" onClick={handleRemoveClick} />
					</button>
				) : 
					<button type="submit" className={isSaved ? "movie-card__save-icon-saved" : "movie-card__save-button"} onClick={handleSaveClick}>
						{isSaved ? (
							<img className="movie-card__save-icon-saved-img" src={saved} alt="Сохранено" />
						) : ("Сохранить")
						}
					</button>}
				</form>
			</div>
		</div>
	);
}

export default MoviesCard;