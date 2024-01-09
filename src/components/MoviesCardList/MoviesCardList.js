import { useState, useEffect } from 'react';
import { useCallback } from "react";
import { useLocation } from "react-router-dom";
import './MoviesCardList.css';
import MovieCard from '../MoviesCard/MoviesCard';
import {
	widthDesktop,
	widthTablet,
	widthMobile,
	showMoreDesktop,
	showMoreTablet,
	showMoreMobile,
	showMoreAddDesktop,
	showMoreAddTablet,
	showMoreAddMobile,
} from '../../utils/contants';

const MoviesCardList = ({ isLoading, savedMovies, onSave, onDelete, movies, filteredMovies, isConnectionError }) => {
	const path = useLocation();

	const cards = path.pathname === "/movies" ? movies : filteredMovies;
	const savedMoviesPath = path.pathname === "/saved-movies";

	const [paginate, setPaginate] = useState(0);
	const [moreButton, setMoreButton] = useState(false);

	const changePaginate = useCallback(() => {
		if (savedMoviesPath) {
			setPaginate(Number.MAX_VALUE);
			return;
		}
		if (window.innerWidth < widthMobile) {
			!savedMoviesPath && setPaginate(showMoreMobile);
			return;
		} else if (window.innerWidth > widthTablet && window.innerWidth < widthDesktop) {
			!savedMoviesPath && setPaginate(showMoreTablet);
			return;
		} else {
			!savedMoviesPath && setPaginate(showMoreDesktop);
			return;
		}
	}, [setPaginate, savedMoviesPath]);

	const onMore = () => {
		if (window.innerWidth < widthMobile) { 
			return setPaginate(paginate + showMoreAddMobile);
		} else if (window.innerWidth > widthTablet && window.innerWidth < widthDesktop) {
			return setPaginate(paginate + showMoreAddTablet);
		} else {
			return setPaginate(paginate + showMoreAddDesktop);
		}
	};

	useEffect(() => {
		changePaginate();
	}, [changePaginate, filteredMovies]);

	useEffect(() => {
		if (cards.length === 0) {
			setMoreButton(false);
		}
		if (paginate >= cards.length) {
			setMoreButton(false);
		} else {
			return setMoreButton(true);
		}
	}, [cards, paginate]);

	return (
		<section className="movies-card-list">
			{isConnectionError && (
				<p className="movies-card-list__connection-error">Во время запроса произошла ошибка. Попробуйте ещё раз</p>
			)}
			{!isConnectionError && !isLoading && (
				<>
					{cards.length === 0 ? (
						<p className="movies__no-result">Ничего не найдено</p>
					) : (
						<ul className="movies-card-list__list">
							{cards.slice(0, paginate).map((card) => (
								<MovieCard movieCard={card} onSave={onSave} onDelete={onDelete} savedMovies={savedMovies} filtredMovies={filteredMovies} key={card.id || card.movieId}/>
							))}
						</ul>
					)}
				</>
			)}
			{!isLoading && 
				<div className="movies__more-button-container">
					{path.pathname === "/movies" && moreButton && (
						<button className="movies-card-list__button link" type="button" onClick={onMore}>Еще</button>
					)}
				</div>
			}
		</section>
	);
};

export default MoviesCardList;