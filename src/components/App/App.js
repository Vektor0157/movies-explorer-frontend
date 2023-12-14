import { Route, Routes, useLocation } from 'react-router-dom';
import React from 'react';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../Movies/SavedMovies/SavedMovies';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import MenuBurger from '../MenuBurger/MenuBurger';

function App() {
	const location = useLocation();
	const displayHeader = ['/', '/saved-movies', '/movies', '/profile'].includes(location.pathname);
	const displayFooter = ['/', '/saved-movies', '/movies'].includes(location.pathname);

	return (
		<div className="body">
			<div className="page">
				{displayHeader && <><Header /><MenuBurger /></>}
				<Routes>
					<Route path="/" element={<Main />}/>
					<Route path="/movies" element={<Movies />}/>
					<Route path='/saved-movies' element={<SavedMovies />}/>
					<Route path="/signin" element={<Login />}/>
					<Route path="/signup" element={<Register />}/>
					<Route path="/profile" element={<Profile />}/>
					<Route path="*" element={<NotFound />}/>
				</Routes>
				{displayFooter && <Footer />}
			</div>
		</div>
	);
}

export default App;