import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import * as auth from '../../utils/auth';
import api from '../../utils/MainApi';
import apiMovies from "../../utils/MoviesApi";

function App() {
	const [isNavPopupOpen, setIsNavPopupOpen] = useState(false);
	const [movies, setMovies] = useState([]);
	const [savedMovies, setSavedMovies] = useState([]);
	const [isLoggedIn, setLoggedIn] = useState(false);
	const [currentUser, setCurrentUser] = useState({});
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const token = localStorage.getItem("jwt");

	useEffect(() => {
		if (token) {
			setLoggedIn(true);
			if (pathname === "/signup" || pathname === "/signin") {
				navigate("/movies");
			} else {
				navigate(pathname);
			}
		}
	}, [token, navigate, pathname]);

	useEffect(() => {
		if (isLoggedIn) {
			api.getUserInfo()
			.then((currentUser) => {
				setCurrentUser({
					name: currentUser.data.name,
					email: currentUser.data.email,
				})
			})
			.catch((err) => err);
			api.getSavedMovies()
			.then((savedMovies) => {
				setSavedMovies(savedMovies);
			})
			.catch((err) => err);
		}
	}, [isLoggedIn]);

	function handleEditNavBarClick() {
		setIsNavPopupOpen(true);
	}

	function handleCloseNavPopup() {
		setIsNavPopupOpen(false);
	}

	function handleLogin() {
		setLoggedIn(true);
	}

	const handleGetAllMovies = (preloader) => {
	preloader(true);
	apiMovies.getMovies()
		.then((data) => {
			setMovies(data);
			localStorage.setItem("arrayMovies", JSON.stringify(data));
		})
		.catch((err) => {
			console.log(err);
		})
		.finally(() => {
			preloader(false);
		});
	};

	function handleRegisterUser(data) {
	auth.register(data)
		.then((res) => {
			localStorage.setItem('jwt', res.token);
			handleLogin();
			navigate("/movies", { replace: true });
		})
		.catch((err) => {
			console.log(err);
		})
	}

	function handleAuthorizationUser(data) {
	auth.login(data)
		.then((res) => {
			localStorage.setItem('jwt', res.token);
			handleLogin();
			navigate("/movies", { replace: true });
		})
		.catch((err) => {
			console.log(err);
		})
	}

	function signOut() {
		setLoggedIn(false);
		setCurrentUser({});
		navigate("/");
		localStorage.removeItem('jwt');
		localStorage.removeItem('arrayMovies');
		localStorage.removeItem('isShorts');
		localStorage.removeItem('searchWord');
		localStorage.removeItem('isShortsSavedMovies');
	}

	function handleUpdateUser(name, email) {
		api.editUserInfo(name, email)
		.then((update) => {
			setCurrentUser({
				...currentUser,
				name: update.name,
				email: update.email,
			})
		})
		.catch((err) => err);
	}

	const handleSaveMovie = (movie, setIsSaved) => {
		const objMovie = {
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
		api.createSavedMovie(objMovie)
			.then((objMovie) => {
				setSavedMovies([objMovie, ...savedMovies]);
			})
			.then(() => {
				setIsSaved(true);
			})
			.catch((err) => err);
	};

	const handleDeleteMovie = (movie, setIsSaved) => {
		api.deleteSaved(movie._id)
		.then(() => {
			setSavedMovies((state) => state.filter((c) => c._id !== movie._id && c));
		})
		.then(() => {
			setIsSaved(false);
		})
		.catch((err) => err);
	};

	return (
		<CurrentUserContext.Provider value={currentUser}>
		  <div className="app">
			 {(pathname === '/' || pathname === '/saved-movies' || pathname === '/movies' || pathname === '/profile') && (
				<Header isOpen={isNavPopupOpen} onClose={handleCloseNavPopup} onEditNavPopup={handleEditNavBarClick} isLoggedIn={isLoggedIn} />
			 )}
			 <Routes>
				<Route path="/" element={<Main />} />
				{isLoggedIn ? (
				  <>
					 <Route path="/movies" element={<Movies movies={movies} getMovies={handleGetAllMovies} setMovies={setMovies} isLoggedIn={isLoggedIn} savedMovies={savedMovies} handleSaveMovie={handleSaveMovie} handleDeleteMovie={handleDeleteMovie} />} />
					 <Route path="/saved-movies" element={<SavedMovies isLoggedIn={isLoggedIn} savedMovies={savedMovies} handleDeleteMovie={handleDeleteMovie} />} />
					 <Route path="/profile" element={<Profile isLoggedIn={isLoggedIn} onSignOut={signOut} onUpdateUser={handleUpdateUser} />} />
				  </>
				) : (
				  <>
					 <Route path="/sign-up" element={isLoggedIn ? <Navigate to="/movies" /> : <Register onRegister={handleRegisterUser} />} />
					 <Route path="/sign-in" element={isLoggedIn ? <Navigate to="/movies" /> : <Login onLogin={handleAuthorizationUser} />} />
				  </>
				)}
				<Route path="*" element={<NotFound />} />
			 </Routes>
			 {(pathname === '/' || pathname === '/saved-movies' || pathname === '/movies') && <Footer />}
		  </div>
		</CurrentUserContext.Provider>
	 );
}

export default App;