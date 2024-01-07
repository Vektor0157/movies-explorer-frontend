import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';
import React, { useEffect, useRef, useState } from 'react';

function SearchForm({
  findNewMovies,
  handlePutWord,
  isShorts,
  setIsShorts,
  isSavedMovies,
}) {

  const inputMovie = useRef();
  const [values, setValues] = useState({ movie: "" });
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const onChange = (event) => {
    const { name, value, validationMessage } = event.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: validationMessage,
    }));

    if (event.target.closest("form").checkValidity()) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.movie.length === 0) {
      setErrors((prev) => ({
        ...prev,
        movie: "Нужно ввести ключевое слово",
      }));
      return;
    }
    findNewMovies(values.movie, setErrors);
  };

  const handleClickCheckbox = (e) => {
    if (e.target.checked) {
      setIsShorts(true);
      findNewMovies(values.movie, setErrors);
      if (!isSavedMovies) {
        localStorage.setItem("isShorts", true);
      } else {
        localStorage.setItem("isShortsSavedMovies", true);
      }

    } else {
      setIsShorts(false);
      findNewMovies(values.movie, setErrors);
      if (!isSavedMovies) {
        localStorage.setItem("isShorts", false);
      } else {
        localStorage.setItem("isShortsSavedMovies", false);
      }
    }
  };

  useEffect(() => {
    if (!isSavedMovies) {
      handlePutWord(setValues);

    }
  }, [handlePutWord, isSavedMovies]);

  return (
    <section className='search'>
      <form className='search__form'
        onSubmit={handleSubmit}
        noValidate>
        <label className='search__container'>
          <input
            ref={inputMovie}
            className={`search__input ${errors.movie?.length > 1 ? "search__input_type_error" : ""
              }`}
            name='movie'
            id='search-input'
            type='text'
            size='25'
            minLength="1"
            required
            placeholder="Фильм"
            value={values.movie || ''}
            onChange={onChange}
          />
          <span
            className={`search__input-error ${errors.movie?.length > 1
              ? "search__input-error_active"
              : ""
              }`}
          >{errors.movie}
          </span>
          <button className={`search__button button__hover ${isValid ? "" : "search__button_disabled"
            }`} type='submit'>Поиск</button>
        </label>
        <FilterCheckbox
          onChange={handleClickCheckbox}
          checked={isShorts} />
      </form>
    </section>
  );
};
export default SearchForm;
