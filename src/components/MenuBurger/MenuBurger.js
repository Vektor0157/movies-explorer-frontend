import React from "react";
import { NavLink } from "react-router-dom";
import "./MenuBurger.css";
import AccountLogo from "../../images/account-logo.svg";

const BurgerMenu = () => {
	function closeBurgerMenu() {
		const burgerMenu = document.getElementById("burger");
		burgerMenu.classList.remove("burger_opened");
	}

	return (
		<>
			<div className="burger" id="burger">
				<div className="burger__overlay"></div>
				<div className="burger__container">
					<button onClick={closeBurgerMenu} className="burger__close-btn link" type="button"></button>
					<nav className="burger__nav">
						<NavLink to="/" className={({ isActive }) => `burger__link link ${ isActive ? "burger__link_active" : ""}`}>Главная</NavLink>
						<NavLink to="/movies" className={({ isActive }) => `burger__link link ${ isActive ? "burger__link_active" : ""}`}>Фильмы</NavLink>
						<NavLink to="/saved-movies" className={({ isActive }) => `burger__link link ${ isActive ? "burger__link_active" : ""}`}>Сохранённые фильмы</NavLink>
						<div className="burger__profile header-auth__profile">
							<NavLink to="/profile" className="header-auth__hyperlink header-auth__hyperlink_active link">Аккаунт</NavLink>
							<NavLink to="/profile">
								<img src={AccountLogo} alt="иконка аккаунта" className="header-auth__account-logo link"/>
							</NavLink>
						</div>
					</nav>
				</div>
			</div>
		</>
	);
};

export default BurgerMenu;
