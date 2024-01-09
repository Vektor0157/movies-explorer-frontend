import React from "react";
import "./Register.css";
import AuthHeader from "../Login/AuthHeader/AuthHeader";
import RegisterForm from "./RegisterForm/RegisterForm";
import AuthNav from "../Login/AuthNav/AuthNav";

const Register = ({ onRegister }) => {
	return (
		<>
			<AuthHeader greeting="Добро пожаловать!" />
			<main className="register">
				<RegisterForm button="Зарегистрироваться" onSubmit={onRegister} />
				<AuthNav text="Уже зарегистрированы?" button="Войти" path="/signin"/>
			</main>
		</>
	);
};

export default Register;