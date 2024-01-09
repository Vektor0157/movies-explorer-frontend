import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./HeaderAuthAcc.css";
import logo from '../../images/logo.svg';
import AccountLogo from "../../images/account-logo.svg";
import MenuBurger from "../MenuBurger/MenuBurger";

const HeaderAuthorizedAccount = () => {
	function openBurgerMenu() {
		const burgerMenu = document.getElementById("burger");
		burgerMenu.classList.add("burger_opened");
	}

	return (
		<header className="header-auth-acc">
			<MenuBurger />
			<div className="header-auth-acc__container">
				<Link to="/">
					<img src={logo} alt="логотип проекта" className="header-auth-acc__logo link"/>
				</Link>
				<nav className="header-auth-acc__menu">
					<ul className="header-auth-acc__links">
						<li className="header-auth-acc__link">
							<NavLink to="/movies" className={({ isActive }) => `header-auth-acc__hyperlink link ${ isActive ? "header-auth-acc__hyperlink_active" : ""}`}>Фильмы</NavLink>
						</li>
						<li className="header-auth__link">
							<NavLink to="/saved-movies" className={({ isActive }) => `header-auth-acc__hyperlink link ${ isActive ? "header-auth-acc__hyperlink_active" : ""}`}>Сохранённые фильмы</NavLink>
						</li>
					</ul>
					<div className="header-auth__profile">
						<NavLink to="/profile" className={({ isActive }) => `header-auth-acc__hyperlink link ${ isActive ? "header-auth-acc__hyperlink_active" : ""}`}>Аккаунт</NavLink>
						<NavLink to="/profile">
							<img src={AccountLogo} alt="иконка аккаунта" className="header-auth-acc__account-logo link"/>
						</NavLink>
					</div>
				</nav>
				<button type="button" onClick={openBurgerMenu} className="header-auth-acc__burger link"></button>
			</div>
		</header>
	);
};

export default HeaderAuthorizedAccount;
