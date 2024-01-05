import React, { useState, useEffect } from 'react';
import './Register.css';
import AuthProfile from '../AuthProfile/AuthProfile';
import Input from '../Input/Input';

function Register({ onRegister, errorMessageAuth }) {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isButtonActive, setIsButtonActive] = useState(false);
	const [emailError, setEmailError] = useState(null);
	const [nameError, setNameError] = useState(null);

	useEffect(() => {
		const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
		const isNameValid = /^[A-Za-z\u0400-\u04FF\s-]+$/.test(name);
		setEmailError(isEmailValid ? null : 'Введите корректный email');
		setNameError(isNameValid ? null : 'Имя может содержать только латиницу, кириллицу, пробел или дефис');
		setIsButtonActive(email !== '' && password !== '' && isEmailValid && isNameValid);
	}, [email, name, password]);

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
        onRegister(name, email, password);
    };

    return (
        <main className="register">
            <AuthProfile
                title="Добро пожаловать!"
                name="register"
                isLoading={false}
                ariaLabel="Зарегистрироваться"
                onSubmit={handleSubmit}
                formType="register"
                gray="Уже зарегистрированы?"
                blue="Войти"
                link="/signin"
                isActive={isButtonActive}
                errorMessageAuth={errorMessageAuth}
            >
                <Input
                    id="name"
                    name="name"
                    className="register__input"
                    type="text"
                    label="Имя"
                    minLength="2"
                    required
                    value={name}
                    onChange={handleChangeName}
                    placeholder="Имя"
                    error={nameError}
                />
                <Input
                    id="email"
                    name="email"
                    className="register__input"
                    type="email"
                    label="Email"
                    required
                    value={email}
                    onChange={handleChangeEmail}
                    placeholder="Email"
                    error={emailError}
                />
                <Input
                    id="password"
                    className="register__input"
                    type="password"
                    label="Пароль"
                    name="password"
                    minLength="8"
                    maxLength="20"
                    required
                    value={password}
                    onChange={handleChangePassword}
                    placeholder="Пароль"
                    error={null}
                />
            </AuthProfile>
        </main>
    );
}

export default Register;