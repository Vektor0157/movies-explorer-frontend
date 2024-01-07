import './SavedMovies.css';
import React, { useCallback, useMemo, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useEffect } from 'react';
import { short } from '../../utils/contants';

function SavedMovies({ savedMovies, handleDeleteMovie }) {
  const isSavedMovies = true;
  const [searchWordSavedMovies, setSearchWordSavedMovies] = useState("");
  const [isShortsSavedMovies, setIsShortsSavedMovies] = useState(false);

  function handleFilterMovies(savedMovies, movieSearchSavedMovies, isShortsSavedMovies) {
    let filteredMovies;
    filteredMovies = savedMovies.filter((movie) => {
      return movie.nameRU.toLowerCase().trim().includes(movieSearchSavedMovies.trim().toLowerCase()) && (isShortsSavedMovies ? movie.duration < short : movie.duration > 0);
    });
    if (filteredMovies.length === 0) {
      return 'Nothing to find'
    }
    else {
      return filteredMovies;
    }
  };

  const filterMovies = useMemo(() => {
    if (searchWordSavedMovies.length === 0 &&
      isShortsSavedMovies === false) {
      return savedMovies;
    }
    return handleFilterMovies(savedMovies, searchWordSavedMovies, isShortsSavedMovies);
  }, [savedMovies, searchWordSavedMovies, isShortsSavedMovies]);

  const findNewMovies = (word) => {
    setSearchWordSavedMovies(word);
  };

  const handleOnClick = (event, movie, setIsSaved) => {
    event.preventDefault();
    handleDeleteMovie(movie, setIsSaved);
  };

  const checkIsSaved = useCallback(
    (movie) => {
      return savedMovies.some((item) => {
        return item.nameRU === movie.nameRU;
      });
    },
    [savedMovies]
  );

  useEffect(() => {
    if (localStorage.getItem("isShortsSavedMovies") !== null) {
      if (localStorage.getItem("isShortsSavedMovies") === "true") {
        setIsShortsSavedMovies(true);
      } else {
        setIsShortsSavedMovies(false);
      }
    }
  }, []);


  return (
    <main className="movies">
      <SearchForm findNewMovies={findNewMovies} isShorts={isShortsSavedMovies} setIsShorts={setIsShortsSavedMovies} isSavedMovies={isSavedMovies}/>
      <MoviesCardList savedMovies={filterMovies} searchWord={searchWordSavedMovies} isSavedMovies={isSavedMovies} handleIsSavedToogle={handleOnClick} checkIsSaved={checkIsSaved}/>
    </main>
  );
};
export default SavedMovies;