import React from 'react';
import { useLocation } from 'react-router-dom';
import './Header.css';
import logo from '../../images/logo.svg';
import NavLinks from '../NavLinks/NavLinks';
import NavBar from '../NavBar/NavBar';

function Header({ isOpen, onClose, onEditNavPopup, isLoggedIn }) {
	const { pathname } = useLocation();

	return (
		<header className={`header ${pathname !== '/' ? '' : 'header_theme_main'}`}>
			<section className='header__section'>
				<div className='header__component'>
					<a href='/#about-project'><img className='header__logo' alt='Логотип' src={logo} /></a>
				</div>
				<div className='header__links'>
					{isLoggedIn ?
					<NavBar isOpen={isOpen} onClose={onClose} onEditNavPopup={onEditNavPopup}/> 
					:
					<NavLinks/>}
				</div>
			</section>
		</header>
	);
}
export default Header;
