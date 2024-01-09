import React from "react";
import { useState } from "react";
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

const SearchForm = ({ search, setSearch, onSearch, isShort, setIsShort, isSearchStarted,}) => {
	const [isEmptySearch, setIsEmptySearch] = useState(false);

	const handleChange = (e) => {
		setSearch(e.target.value);
	};

	const handleCheckbox = () => {
		isSearchStarted && onSearch(!isShort);
		setIsShort(!isShort);
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();
		if (!e.target.movie.value.trim()) {
			return setIsEmptySearch(true);
		}
		setIsEmptySearch(false);
		onSearch(isShort);
	};

	return (
		<section className="search-form">
			<form className="search-form__container" onSubmit={handleFormSubmit} noValidate>
				<div className="search-form__content">
					<input type="text" className="search-form__field" placeholder="Фильм" name="movie" minLength="2" maxLength="40" onChange={handleChange} value={search} required/>
					<button className="search-form__submit-button link">Поиск</button>
				</div>
				<div className="search-form__short-movie">
					<FilterCheckbox label="Короткометражки" handleCheckbox={handleCheckbox} isShort={isShort}/>
				</div>
				{isEmptySearch && (
					<p className="search-form__error">Нужно ввести ключевое слово</p>
				)}
			</form>
		</section>
	);
};

export default SearchForm;