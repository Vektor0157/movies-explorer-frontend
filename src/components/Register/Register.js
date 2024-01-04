import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Register.css';
import AuthProfile from '../AuthProfile/AuthProfile';
import Input from '../Input/Input';
import { useFormValidation } from '../../hooks/useFormValidation';

function Register({ onRegister, setErrorMessageAuth, errorMessageAuth }) {
	const location = useLocation();
	const isLoading = true;
	const { values, handleChange, resetForm, errors, isValid } = useFormValidation();
	const [isButtonActive, setIsButtonActive] = useState(false);

	useEffect(() => {
		setErrorMessageAuth('');
		if (location.pathname === '/signup') {
			resetForm();
		}
	}, [location.pathname, resetForm, setErrorMessageAuth]);

	useEffect(() => {
		setIsButtonActive(isValid);
	}, [isValid]);

	const handleSubmit = (evt) => {
		evt.preventDefault();
		if (isButtonActive) {
			const { name, email, password } = values;
			onRegister(name, email, password);
		}
	};

	return (
		<main className="register">
			<AuthProfile title="Добро пожаловать!" name="register" isLoading={isLoading} ariaLabel="Зарегистрироваться" onSubmit={handleSubmit} formType="register" gray="Уже зарегистрированы?" blue="Войти" link="/signin" isActive={isButtonActive} errorMessageAuth={errorMessageAuth}>
				<Input id="name" name="name" className="register__input" type="text" label="Имя" minLength="2" required value={values.name || ''} onChange={handleChange} placeholder="Имя" error={errors.name}/>
				<Input id="email" name="email" className="register__input" type="email" label="Email" required value={values.email || ''} onChange={handleChange} placeholder="Email" error={errors.email}/>
				<Input id="password" className="register__input" type="password" label="Пароль" name="password" minLength="8" maxLength="20" required value={values.password || ''} onChange={handleChange} placeholder="Пароль" error={errors.password}/>
			</AuthProfile>
		</main>
	);
}

export default Register;