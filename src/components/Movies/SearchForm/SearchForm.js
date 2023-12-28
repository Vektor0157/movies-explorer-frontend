import FilterCheckbox from './FilterCheckbox/FilterCheckbox';
import './SearchForm.css';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

function SearchForm({ onSearch, onFilter, isShortFilm, isShortFilmSaved, searchQuery, setSearchQuery }) {
	const location = useLocation();
	const isSavedMoviesPage = location.pathname === '/saved-movies';
	const [setIsQueryError] = useState(false);

	function handleChangeQuery(e) {
		setSearchQuery(e.target.value);
		setIsQueryError(false);
	}

	function handleSubmit(e) {
		e.preventDefault();
		if (searchQuery.trim().length === 0) {
			setIsQueryError(true);
		} else {
			setIsQueryError(false);
			onSearch(searchQuery);
		}
	}

	return (
		<div className={`searchForm ${isSavedMoviesPage ? 'searchForm-movies' : ''}`}>
			<div className='searchForm__content'>
				<form onSubmit={handleSubmit}>
					<input type="text" className="searchForm__input" placeholder="Фильм" value={searchQuery || ''} onChange={handleChangeQuery}/>
					<button className="searchForm__button" type="submit">Поиск</button>
				</form>
			</div>
			<FilterCheckbox onFilter={onFilter} isShortFilm={isShortFilm} isShortFilmSaved={isShortFilmSaved}/>
			<div className='searchForm__separator'></div>
		</div>
	)
}

export default SearchForm;