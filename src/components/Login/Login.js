import React, { useEffect, useState } from 'react';
import './Login.css';
import AuthProfile from '../AuthProfile/AuthProfile';
import Input from '../Input/Input';
import {useFormValidation} from '../../hooks/useFormValidation';

function Login({ onLogin, errorMessageAuth }) {
	const { values, handleChange, errors, isValid } = useFormValidation();
	const isLoading = true;
	const [isButtonActive, setIsButtonActive] = useState(false);

	const handleSubmit = (evt) => {
		evt.preventDefault();
		if (isButtonActive) {
			const { email, password } = values;
			onLogin(email, password);
		}
	};

	useEffect(() => {
		setIsButtonActive(isValid);
	}, [isValid]);

	return (
		<main className='login'>
			<AuthProfile title="Рады видеть!" name="login" isLoading={isLoading} ariaLabel="Войти" onSubmit={handleSubmit} gray="Ещё не зарегистрированы?" blue="Регистрация" link="/signup" isActive={isButtonActive} errorMessageAuth={errorMessageAuth}>
				<Input id="email" name="email" className="login__input" type="email" label="Email" required value={values.email || ''} onChange={handleChange} placeholder="Email" error={errors.email}/>
				<Input id="password" className="login__input" type="password" label="Пароль" name="password" minLength="8" maxLength="20" required value={values.password || ''} onChange={handleChange} placeholder="Пароль" error={errors.password} autoComplete="current-password"/>
			</AuthProfile>
		</main>
	);
}

export default Login;