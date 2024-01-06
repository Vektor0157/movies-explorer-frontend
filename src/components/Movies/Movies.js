import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import apiMovies from '../../utils/MoviesApi';

function Movies({ movies, getMovies, setMovies, handleSaveMovie, savedMovies, handleDeleteMovie, }) {
	const [searchWord, setSearchWord] = useState("");
	const [preloader, setPreloader] = useState(false);
	const [isShorts, setIsShorts] = useState(false);
	const isSavedMovies = false;

	function handleFilterMovies(movies, movieSearch, isShorts) {
		let filteredMovies;
		filteredMovies = movies.filter((movie) => {
			return movie.nameRU.toLowerCase().trim().includes(movieSearch.trim().toLowerCase()) && (isShorts ? movie.duration < apiMovies : movie.duration > 0);
		});
		if (filteredMovies.length === 0) {
			return 'Nothing to find'
		}
		else {
			return filteredMovies;
		}
	};

	const filterMovies = useMemo(() => {
		if (searchWord.length === 0) {
			return [];
		}
		return handleFilterMovies(movies, searchWord, isShorts);
	}, [movies, searchWord, isShorts]);

	const findNewMovies = (word) => {
		if (movies.length < 1) {
			getMovies(setPreloader);
		}
		setSearchWord(word);
		localStorage.setItem("searchWord", word);
	};

	const findMovie = useCallback(
		(movie, isSaved) => {
			if (isSaved) {
			return savedMovies.find((item) => {
				return item.nameRU === movie.nameRU;
			});
			}
		},
		[savedMovies]
	);

	const handleIsSavedToogle = (e, movie, setIsSaved, isSaved) => {
		e.preventDefault();
		if (!isSaved) {
			handleSaveMovie(movie, setIsSaved);
		} else {
			const deletedMovie = findMovie(movie, isSaved);
			handleDeleteMovie(deletedMovie, setIsSaved);
		}
	};

	const checkIsSaved = useCallback(
		(movie) => {
			return savedMovies.some((item) => {
				return item.nameRU === movie.nameRU;
			});
		},
		[savedMovies]
	);

	const putWordInInput = (setValues) => {
		if (localStorage.getItem("searchWord") !== null) {
			setValues((prev) => ({
			...prev,
			movie: localStorage.getItem("searchWord"),
			}));
		}
	};

	useEffect(() => {
		if (localStorage.getItem("searchWord") !== null) {
			setSearchWord(localStorage.getItem("searchWord"));
		}
		if (localStorage.getItem("isShorts") !== null) {
			if (localStorage.getItem("isShorts") === "true") {
				setIsShorts(true);
			} else {
				setIsShorts(false);
			}
		}
		if (localStorage.getItem("arrayMovies") !== null) {
			setMovies(JSON.parse(localStorage.getItem("arrayMovies")));
		}
	}, [setMovies]);

	return (
		<main className='movies'>
			<SearchForm findNewMovies={findNewMovies} handlePutWord={putWordInInput} isShorts={isShorts} setIsShorts={setIsShorts} isSavedMovies={isSavedMovies}/>
			<Preloader isVisible={preloader} />
			<MoviesCardList movies={filterMovies} searchWord={searchWord} isSavedMovies={isSavedMovies} handleIsSavedToogle={handleIsSavedToogle} checkIsSaved={checkIsSaved}/>
		</main>
	)
}

export default Movies;