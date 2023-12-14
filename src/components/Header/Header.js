import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import './Header.css';
import logo from '../../images/logo.svg';
import MenuBurger from '../MenuBurger/MenuBurger';

function Header({ loggedIn }) {
	const location = useLocation();
	const navigate = useNavigate();
	const isLargeScreen = useMediaQuery({ minWidth: 1280 });
	const [isBurgerOpen, setBurgerOpen] = useState(false);
	const isProfilePage = location.pathname === '/profile';
	const isMoviesPage = location.pathname === '/movies';
	const isSavedMoviesPage = location.pathname === '/saved-movies';
	const isHomePage = location.pathname === '/';

	const toggleBurger = () => {
		setBurgerOpen(!isBurgerOpen);
	};

	const closeBurger = () => {
		setBurgerOpen(false);
	};

	const handleLinkClick = () => {
		setBurgerOpen(false);
		navigate();
	};

	useEffect(() => {
		if ((isHomePage || isProfilePage || isMoviesPage || isSavedMoviesPage) && isLargeScreen) {
			setBurgerOpen(false);
		}
	}, [isHomePage, isProfilePage, isMoviesPage, isSavedMoviesPage, isLargeScreen]);

	const renderMainBurger = () => {
		if (isHomePage) {
			if (loggedIn) {
				return (
					<>
						<Link to="/movies" className={`burger-list ${isMoviesPage ? 'active' : ''}`} onClick={handleLinkClick}>Фильмы</Link>
						<Link to="/saved-movies" className={`burger-list ${isSavedMoviesPage ? 'active' : ''}`} onClick={handleLinkClick}>Сохранённые фильмы</Link>
						<Link to="/profile" className={`burger-list burger-list_account burger-list_account_background ${isProfilePage ? 'active' : ''}`} onClick={handleLinkClick}>Аккаунт&nbsp;&nbsp;&nbsp;</Link>
					</>
				);
			} else {
				return (
					<>
						<Link to="/signup" className='burger-list-auth' onClick={handleLinkClick}>Регистрация</Link>
						<Link to="/signin" className='burger-list-auth' onClick={handleLinkClick}>Войти</Link>
					</>
				);
			}
		} else {
			return (
				<>
					<Link to="/movies" className={`burger-list ${isMoviesPage ? 'active' : ''}`} onClick={handleLinkClick}>Фильмы</Link>
					<Link to="/saved-movies" className={`burger-list ${isSavedMoviesPage ? 'active' : ''}`} onClick={handleLinkClick}>Сохранённые фильмы</Link>
					<Link to="/profile" className={`burger-list burger-list_account ${isProfilePage ? 'active' : ''}`} onClick={handleLinkClick}>Аккаунт&nbsp;&nbsp;&nbsp;&nbsp;</Link>
				</>
			);
		}
	};
	return (
		<header className={`header ${isProfilePage ? 'profile-header' : ''} ${isMoviesPage ? 'movies-header' : ''} ${isSavedMoviesPage ? 'saved-movies-header' : ''}`}>
			<div className={`header__container ${isMoviesPage ? 'header__container-movies' : ''} ${isSavedMoviesPage ? 'header__container-saved-movies' : ''}${isProfilePage ? 'header__container-profile' : ''}${isHomePage ? 'header__container-home-page' : ''} `}>
				<Link className='header__logo' to="/"><img className='header__logo-img' src={logo} alt="логотип" /></Link>
				<nav>
					{isLargeScreen ? (
						<>
						<div className='menu'>
							{renderMainBurger()}
						</div>
						</>
					) : (
						<button className={`burger-button-active ${isBurgerOpen ? 'burger-button' : ''}`} onClick={toggleBurger}></button>
					)}
					{isBurgerOpen && isHomePage && (
						<div className='menu'>
							{loggedIn ? (
								<MenuBurger isOpen={isBurgerOpen} onClose={closeBurger} />
							) : (
								<>
									<Link to="/signup" className='burger__list-auth' onClick={handleLinkClick}>Регистрация</Link>
									<Link to="/signin" className='burger__list-auth' onClick={handleLinkClick}>Войти</Link>
								</>
							)}
						</div>
					)}
				</nav>
				{(isProfilePage || isMoviesPage || isSavedMoviesPage) && (
					<MenuBurger isOpen={isBurgerOpen} onClose={closeBurger} />
				)}
			</div>
		</header>
	);
}

export default Header;
