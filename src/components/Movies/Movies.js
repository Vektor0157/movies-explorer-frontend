import React, { useState, useEffect } from "react";
import "./Movies.css";
import Footer from "../Footer/Footer";
import HeaderAuth from "../HeaderAuth/HeaderAuth";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { short } from "../../utils/contants";
import apiMovies from "../../utils/MoviesApi";

const Movies = ({ savedMovies, isLoading, onDelete, onSave, isConnectionError, loadAllMovies }) => {
	const [isShort, setIsShort] = useState(localStorage.getItem("isShort") === "true");
	const [search, setSearch] = useState(localStorage.getItem("search") || "");
	const [isSearchStarted, setIsSearchStarted] = useState(localStorage.getItem("isSearchStarted"));
	const [filteredMovies, setFilteredMovies] = useState([]);

	useEffect(() => {
		if (isSearchStarted) {
			const storedMovies = JSON.parse(localStorage.getItem("filteredMovies"));
			if (storedMovies && storedMovies.length > 0) {
				setFilteredMovies(storedMovies);
			}
		}
	}, [isSearchStarted]);

	const handleSearchSubmit = (isShort) => {
		apiMovies.getMovies()
			.then((data) => {
				const movies = data.filter((movie) => {
					const filteredMovieInclude =
					movie.nameRU.toLowerCase().includes(search.toLowerCase())
					||
					movie.nameEN.toLowerCase().includes(search.toLowerCase());
					return isShort ? movie.duration < short && filteredMovieInclude : filteredMovieInclude;
				});
				setIsSearchStarted(true)
				setFilteredMovies(movies);
				localStorage.setItem("isShort", isShort);
				localStorage.setItem("search", search);
				localStorage.setItem("isSearchStarted", true);
				localStorage.setItem("filteredMovies", JSON.stringify(movies));
			})
			.catch((err) => {
				console.log(err);
				setFilteredMovies([]);
			});
	};

	return (
		<>
			<HeaderAuth />
			<main className="movies">
				<SearchForm search={search} setSearch={setSearch} onSearch={handleSearchSubmit} isShort={isShort} setIsShort={setIsShort} isSearchStarted={isSearchStarted} />
				{isSearchStarted && (
					<MoviesCardList isLoading={isLoading} savedMovies={savedMovies} onSave={onSave} onDelete={onDelete} movies={filteredMovies} filteredMovies={filteredMovies} isConnectionError={isConnectionError} />
				)}
			</main>
			<Footer />
		</>
	);
};

export default Movies;