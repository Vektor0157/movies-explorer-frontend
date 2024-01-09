import React from "react";
import "./Login.css";
import AuthHeader from "./AuthHeader/AuthHeader";
import LoginForm from "../LoginForm/LoginForm";
import AuthNav from "./AuthNav/AuthNav";

const Login = ({ onLogin }) => {
	return (
		<>
			<AuthHeader greeting="Рады видеть!" />
			<main className="login">
				<LoginForm button="Войти" onSubmit={onLogin} />
				<AuthNav text="Ещё не зарегистрированы?" button="Регистрация" path="/signup"/>
			</main>
		</>
	);
};

export default Login;
