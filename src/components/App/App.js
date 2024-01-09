import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import Popup from "../Popup/Popup";
import CurrentUserContext from '../../contexts/CurrentUserContext';
import api from '../../utils/MainApi';
import apiMovies from "../../utils/MoviesApi";

function App() {
	const navigate = useNavigate();
	const path = useLocation();
	const [isLoading, setIsLoading] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [currentUser, setCurrentUser] = useState({});
	const [moviesList, setMoviesList] = useState([]);
	const [savedMovies, setSavedMovies] = useState([]);
	const [isConnectionError, setIsConnectionError] = useState(false);
	const [isPopupSuccess, setIsPopupSuccess] = useState({
		isOpen: false,
		isSuccess: false,
	});

	useEffect(() => {
		const jwt = localStorage.getItem("jwt");
		if (jwt) {
		api.getUserInfo()
			.then((data) => {
				setCurrentUser((userData) => ({
					...userData,
					name: data.name,
					email: data.email,
					_id: data._id,
				}));
				setIsLoggedIn(true);
			})
			.catch((err) => {
				console.log(err);
				logOut();
			});
		} else {
			logOut();
		}
	}, []);

	const handleLogin = (email, password) => {
		return api.login(email, password)
			.then(({ token }) => {
				localStorage.setItem("jwt", token);
				api.setToken(token);
				return api.getUserInfo(token);
			})
			.then(({ name, email }) => {
				setCurrentUser((prev) => ({
					...prev,
					name: name,
					email: email,
				}));
				setIsLoggedIn(true);
				navigate("/movies", { replace: true });
				return true;
			});
	};

	const handleRegister = (name, email, password) => {
		return api.register(name, email, password)
			.then(() => handleLogin(email, password));
	};

	const logOut = () => {
		localStorage.clear();
		setCurrentUser({});
		setIsLoggedIn(false);
		navigate("/", { replace: true });
	};

	const handleUserUpdate = (userData) => {
		setIsLoading(true);
		api.editUserInfo(userData)
			.then((data) => {
				setCurrentUser(data);
				setIsPopupSuccess({
					isOpen: true,
					isSuccess: true,
				});
			})
			.catch((err) => {
				console.log(err);
				setIsPopupSuccess({
					isOpen: true,
					isSuccess: false,
				});
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const closePopup = () => {
		setIsPopupSuccess({
			isOpen: false,
			isSuccess: false,
		});
	};

	const loadAllMovies = () => {
		setIsLoading(true);
		setIsConnectionError(false);
		apiMovies.getMovies()
			.then((data) => {
				setMoviesList(data);
			})
			.catch((err) => {
				console.log(err);
				setIsConnectionError(true);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	useEffect(() => {
		const loadSavedMovies = () => {
			setIsLoading(true);
			setIsConnectionError(false);
			api.getSavedMovies()
				.then((data) => {
					setSavedMovies(data);
				})
				.catch((err) => {
					console.log(err);
					setIsConnectionError(true);
				})
				.finally(() => {
					setIsLoading(false);
				});
		};
		if (isLoggedIn) {
			loadSavedMovies();
		}
	}, [isLoggedIn]);

	const handleSaveMovie = (movie) => {
		const movieObject = {
			country: movie.country,
			director: movie.director,
			duration: movie.duration,
			year: movie.year,
			description: movie.description,
			image: `https://api.nomoreparties.co${movie.image.url}`,
			trailerLink: movie.trailerLink,
			thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
			movieId: movie.id,
			nameRU: movie.nameRU,
			nameEN: movie.nameEN,
		};
		setIsConnectionError(false);
		api.addMovie(movieObject)
			.then((userMovie) => {
				setSavedMovies([...savedMovies, userMovie.movie]);
			})
			.catch((err) => {
				console.log(err);
				setIsConnectionError(true);
			});
	};

	const handleDeleteMovie = (movie) => {
		const movieToBeRemoved = savedMovies.find((m) => {
			if (path.pathname === "/movies") {
				return movie.id.toString() === m.movieId;
			} else {
				return movie.movieId === m.movieId;
			}
		});
		setIsConnectionError(false);
		api.removeMovie(movieToBeRemoved._id.toString())
			.then((removedMovie) => {
				setSavedMovies((state) =>
					state.filter((item) => item._id !== removedMovie._id)
				);
			})
			.catch((err) => {
				console.log(err);
				setIsConnectionError(true);
			});
	};

	return (
		<div className="app">
			<CurrentUserContext.Provider value={currentUser}>
				<Routes>
					<Route path="/" element={<Main isLoggedIn={isLoggedIn} />} />
					<Route path="/signin" element={<Login onLogin={handleLogin} />} />
					<Route path="/signup" element={<Register onRegister={handleRegister} />}/>
					<Route path="/profile" element={
						<Profile logOut={logOut} handleUserUpdate={handleUserUpdate} isLoading={isLoading}/>
					}/>
					<Route path="/movies" element={
						<Movies savedMovies={savedMovies} moviesList={moviesList} isLoading={isLoading} onDelete={handleDeleteMovie} onSave={handleSaveMovie} isConnectionError={isConnectionError} loadAllMovies={loadAllMovies}/>
					}/>
					<Route path="/saved-movies" element={
						<SavedMovies savedMoviesList={savedMovies} isLoading={isLoading} onDelete={handleDeleteMovie} onSave={handleSaveMovie} isConnectionError={isConnectionError}/>
					}/>
					<Route path="*" element={<NotFound />} />
				</Routes>
				<Popup onClose={closePopup} isSuccess={isPopupSuccess.isSuccess} isOpen={isPopupSuccess.isOpen}/>
			</CurrentUserContext.Provider>
		</div>
	);
}

export default App;