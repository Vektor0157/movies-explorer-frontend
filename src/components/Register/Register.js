import React, { useState, useEffect } from 'react';
import './Register.css';
import AuthProfile from '../AuthProfile/AuthProfile';
import Input from '../Input/Input';

function Register({ handleRegister, errorMessageAuth }) {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isButtonActive, setIsButtonActive] = useState(false);
	const [emailError, setEmailError] = useState('');
	const [nameError, setNameError] = useState('');
	const [passwordError, setPasswordError] = useState('');

	const handleChangeName = (e) => {
		setName(e.target.value);
	};

	const handleChangeEmail = (e) => {
		setEmail(e.target.value);
	};

	const handleChangePassword = (e) => {
		setPassword(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (name && email && password) {
			handleRegister(name, email, password);
		}
	};

	useEffect(() => {
		const isNameValid = /^[A-Za-z\u0400-\u04FF\s-]+$/.test(name);
		const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
		const isPasswordValid = password.length >= 8;
		setNameError(isNameValid ? '' : 'Имя может содержать только латиницу, кириллицу, пробел или дефис');
		setEmailError(isEmailValid ? '' : 'Введите корректный email');
		setPasswordError(isPasswordValid ? '' : 'Пароль должен содержать не менее 8 символов');
		setIsButtonActive(isNameValid && isEmailValid && isPasswordValid);
	}, [name, email, password]);

	return (
		<main className="register">
			<AuthProfile title="Добро пожаловать!" name="register" ariaLabel="Зарегистрироваться" handleSubmit={handleSubmit} gray="Уже зарегистрированы?" blue="Войти" link="/signin" errorMessageAuth={errorMessageAuth} isActive={isButtonActive} handleRegister={handleRegister}>
				<Input id="name" name="name" className="register__input" type="text" label="Имя" minLength="2" required value={name} onChange={handleChangeName} placeholder="Имя" error={nameError}/>
				<Input id="email" name="email" className="register__input" type="email" label="Email" required value={email} onChange={handleChangeEmail} placeholder="Email" error={emailError}/>
				<Input id="password" className="register__input" type="password" label="Пароль" name="password" minLength="8" maxLength="20" required value={password} onChange={handleChangePassword} placeholder="Пароль" error={passwordError}/>
			</AuthProfile>
		</main>
	);
}

export default Register;