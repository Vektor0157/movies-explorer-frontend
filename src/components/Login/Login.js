import React, { useState } from 'react';
import './Login.css';
import AuthProfile from '../AuthProfile/AuthProfile';
import Input from '../Input/Input';

function Login({ handleLogin, errorMessageAuth }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isFormValid, setIsFormValid] = useState(false);

	const handleChangeEmail = (e) => {
		setEmail(e.target.value);
		checkFormValidity(e.target.value, password);
	};

	const handleChangePassword = (e) => {
		setPassword(e.target.value);
		checkFormValidity(email, e.target.value);
	};

	const checkFormValidity = (emailValue, passwordValue) => {
		setIsFormValid(emailValue !== '' && passwordValue !== '');
	};

	const handleSubmit = (evt) => {
		evt.preventDefault();
		if (isFormValid) {
			handleLogin(email, password);
		}
	};

	return (
		<main className='login'>
			<AuthProfile title="Рады видеть!" name="login" ariaLabel="Войти" handleSubmit={handleSubmit} gray="Ещё не зарегистрированы?" blue="Регистрация" link="/signup" errorMessageAuth={errorMessageAuth} isActive={isFormValid} handleLogin={handleLogin}>
				<Input id="email" name="email" className="login__input" type="email" label="Email" required value={email} onChange={handleChangeEmail} placeholder="Email" error={email === '' ? 'Введите email' : ''}/>
				<Input id="password" className="login__input" type="password" label="Пароль" name="password" minLength="8" maxLength="20" required value={password} onChange={handleChangePassword} placeholder="Пароль" error={password === '' ? 'Введите пароль' : ''} autoComplete="current-password"/>
			</AuthProfile>
		</main>
	);
}

export default Login;