import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./HeaderAuth.css";
import logo from '../../images/logo.svg';
import AccountLogo from "../../images/account-logo.svg";
import MenuBurger from "../MenuBurger/MenuBurger";

const HeaderAuthorized = () => {
	function openBurgerMenu() {
		const burgerMenu = document.getElementById("burger");
		burgerMenu.classList.add("burger_opened");
	}

	return (
		<header className="header-auth">
			<MenuBurger />
			<div className="header-auth__container">
				<Link to="/">
					<img src={logo} alt="логотип проекта" className="header-auth__logo link"/>
				</Link>
				<nav className="header-auth__menu">
					<ul className="header-auth__links">
						<li className="header-auth__link">
							<NavLink to="/movies" className={({ isActive }) => `header-auth__hyperlink link ${ isActive ? "header-auth__hyperlink_active" : ""}`}>Фильмы</NavLink>
						</li>
						<li className="header-auth__link">
							<NavLink to="/saved-movies" className={({ isActive }) => `header-auth__hyperlink link ${ isActive ? "header-auth__hyperlink_active" : ""}`}>Сохранённые фильмы</NavLink>
						</li>
					</ul>
					<div className="header-auth__profile">
						<NavLink to="/profile" className={({ isActive }) => `header-auth__hyperlink link ${ isActive ? "header-auth__hyperlink_active" : ""}`}>Аккаунт</NavLink>
						<NavLink to="/profile">
							<img src={AccountLogo} alt="иконка аккаунта" className="header-auth__account-logo link"/>
						</NavLink>
					</div>
				</nav>
				<button type="button" onClick={openBurgerMenu} className="header-auth__burger link"></button>
			</div>
		</header>
	);
};

export default HeaderAuthorized;
