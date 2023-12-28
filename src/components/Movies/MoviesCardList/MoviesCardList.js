import React, { useState, useEffect, useRef } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import useViewport from '../../../hooks/useViewport';
import {
	widthDesktop,
	widthTablet,
	widthMobile,
	showMoreDesktop,
	showMoreTablet,
	showMoreMobile,
	showMoreAddDesktop,
	showMoreAddMobile,
} from '../../../utils/contants';

function MoviesCardList({ handleSaveMovie, handleRemoveMovie, savedMovies, isSaved, filteredMovies, isNotFoundError, isServerError }) {
	const { width } = useViewport();
	const moviesToShowRef = useRef(showMoreMobile);
	const [visibleMovies, setVisibleMovies] = useState(moviesToShowRef.current);
	const [isLoading] = useState(false);

	useEffect(() => {
		if (width >= widthDesktop) {
			moviesToShowRef.current = showMoreDesktop;
		} else if (width >= widthTablet) {
			moviesToShowRef.current = showMoreTablet;
		} else if (width >= widthMobile) {
			moviesToShowRef.current = showMoreMobile;
		}
		setVisibleMovies(moviesToShowRef.current);
	}, [width]);

	useEffect(() => {
		setVisibleMovies(moviesToShowRef.current);
	}, [filteredMovies]);

	const handleShowMoreClick = () => {
		let additionalMovies = showMoreAddMobile;
		if (width >= widthDesktop) {
			additionalMovies = showMoreAddDesktop;
		}
		const newVisibleMovies = visibleMovies + additionalMovies;
		setVisibleMovies(newVisibleMovies);
		if (newVisibleMovies >= filteredMovies.length) {
			setVisibleMovies(filteredMovies.length);
		}
	};

	const flatDataMovies = filteredMovies.flat();
	const moviesToDisplay = flatDataMovies.slice(0, visibleMovies);

	return (
		<section className="movies-card-list">
			{isNotFoundError && !isLoading && <span>Ничего не найдено</span>}
			{isServerError && !isLoading && (
				<span>Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</span>)
			}
			<div className='movies-card-list__content'>
				{moviesToDisplay.map((movie) => (
					<MoviesCard key={movie.id} movie={movie} handleSaveMovie={handleSaveMovie} handleRemoveMovie={handleRemoveMovie} savedMovies={savedMovies} isSaved={movie.isSaved} filteredMovies={filteredMovies} />
				))}
			</div>
			{visibleMovies < flatDataMovies.length && (
				<button className="movies-card-list__button" onClick={handleShowMoreClick}>Ещё</button>
			)}
		</section>
	);
}

export default MoviesCardList;
