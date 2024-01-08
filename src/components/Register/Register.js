import React from "react";
import "./Register.css";
import AuthHeader from "../Login/AuthHeader/AuthHeader";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import AuthNavigation from "../Login/AuthNavigation/AuthNavigation";

const Register = ({ onRegister }) => {
	return (
		<>
			<AuthHeader greeting="Добро пожаловать!" />
			<main className="register">
				<RegistrationForm button="Зарегистрироваться" onSubmit={onRegister} />
				<AuthNavigation text="Уже зарегистрированы?" button="Войти" path="/signin"/>
			</main>
		</>
	);
};

export default Register;