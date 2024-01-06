import React, { useState, useEffect } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import {
	widthDesktop,
	widthMobile,
	showMoreDesktop,
	showMoreTablet,
	showMoreMobile,
	showMoreAddDesktop,
	showMoreAddTablet,
	showMoreAddMobile,
} from '../../utils/contants';

function MoviesCardList({ movies, isSavedMovies, savedMovies, searchWord, handleIsSavedToogle, checkIsSaved,}) {
	const [amountOfMovies, setAmountOfMovies] = useState(null);

	const screenWidth = () => {
		if (window.innerWidth > widthDesktop) {
			setAmountOfMovies(showMoreDesktop);
		} else if (window.innerWidth > widthMobile && window.innerWidth < widthDesktop) {
			setAmountOfMovies(showMoreTablet);
		} else {
			setAmountOfMovies(showMoreMobile);
		}
	};

	const addMovies = () => {
		if (window.innerWidth > widthDesktop) {
			setAmountOfMovies(amountOfMovies + showMoreAddDesktop);
		} else if (window.innerWidth > widthMobile && window.innerWidth < widthDesktop) {
			setAmountOfMovies(amountOfMovies + showMoreAddTablet);
		} else {
			setAmountOfMovies(amountOfMovies + showMoreAddMobile);
		}
	};

	useEffect(() => {
		screenWidth();
		window.addEventListener("resize", screenWidth);
		return () => {
			window.removeEventListener("resize", screenWidth);
		};
	}, [searchWord]);

	return (
		<section className="cardlist">
			<div className='cardlist__elements'>
				{!isSavedMovies && (Array.isArray(movies) ? movies
					.slice(0, amountOfMovies)
					.map((movie) => (
						<MoviesCard key={movie.id} movie={movie} isSavedMovies={isSavedMovies} handleIsSavedToogle={handleIsSavedToogle} checkIsSaved={checkIsSaved}/>
					)) :
					<div className="cardlist__text">Ничего не найдено</div>)
				}
				{isSavedMovies && (Array.isArray(savedMovies) ? savedMovies
					.map((savedMovie) => ( 
						<MoviesCard key={savedMovie._id} movie={savedMovie} isSavedMovies={isSavedMovies} handleIsSavedToogle={handleIsSavedToogle} checkIsSaved={checkIsSaved}/>
					)) :
					<div className="cardlist__text">Ничего не найдено</div>)}
			</div>
			{!isSavedMovies && movies.length > amountOfMovies && Array.isArray(movies) && (
				<button onClick={addMovies} className='cardlist__button-more' type='button'>Ещё</button>
			)}
		</section>
	);
}
export default MoviesCardList;
