import React from "react";
import { Link } from "react-router-dom";
import "./AuthHeader.css";
import logo from '../../../images/logo.svg';

const AuthHeader = ({ greeting }) => {
	return (
		<header className="auth-header">
			<div className="auth-header__container">
				<Link to="/">
					<img src={logo} alt="логотип проекта" className="auth-header__logo link"/>
				</Link>
				<h1 className="auth-header__greeting">{greeting}</h1>
			</div>
		</header>
	);
};

export default AuthHeader;
