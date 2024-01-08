import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./HeaderAuthorizedAccount.css";
import logo from '../../images/logo.svg';
import AccountLogo from "../../images/account-logo.svg";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

const HeaderAuthorizedAccount = () => {
	function openBurgerMenu() {
		const burgerMenu = document.getElementById("burger-menu");
		burgerMenu.classList.add("burger-menu_opened");
	}

	return (
		<header className="header-authorized-account">
			<BurgerMenu />
			<div className="header-authorized-account__container">
				<Link to="/">
					<img src={logo} alt="логотип проекта" className="header-authorized-account__logo link"/>
				</Link>
				<nav className="header-authorized-account__menu">
					<ul className="header-authorized-account__links">
						<li className="header-authorized-account__link">
							<NavLink to="/movies" className={({ isActive }) => `header-authorized-account__hyperlink link ${ isActive ? "header-authorized-account__hyperlink_active" : ""}`}>Фильмы</NavLink>
						</li>
						<li className="header-authorized__link">
							<NavLink to="/saved-movies" className={({ isActive }) => `header-authorized-account__hyperlink link ${ isActive ? "header-authorized-account__hyperlink_active" : ""}`}>Сохранённые фильмы</NavLink>
						</li>
					</ul>
					<div className="header-authorized__profile">
						<NavLink to="/profile" className={({ isActive }) => `header-authorized-account__hyperlink link ${ isActive ? "header-authorized-account__hyperlink_active" : ""}`}>Аккаунт</NavLink>
						<NavLink to="/profile">
							<img src={AccountLogo} alt="иконка аккаунта" className="header-authorized-account__account-logo link"/>
						</NavLink>
					</div>
				</nav>
				<button type="button" onClick={openBurgerMenu} className="header-authorized-account__burger-menu link"></button>
			</div>
		</header>
	);
};

export default HeaderAuthorizedAccount;
