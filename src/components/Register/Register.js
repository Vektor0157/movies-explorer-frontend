import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Register.css';
import AuthProfile from '../AuthProfile/AuthProfile';
import Input from '../Input/Input';
import { useFormValidation } from '../../hooks/useFormValidation';

function Register() {
	return (
		<main className='register'>
			<AuthProfile title="Добро пожаловать!" name="register" ariaLabel="Зарегистрироваться" formType="register" gray="Уже зарегистрированы?" blue="Войти" link="/signin">
				<Input name="name" className="register__input" type="text" label="Имя" required placeholder="Имя"/>
				<Input name="email" className="register__input" type="email" label="Email" required placeholder="Email"/>
				<Input className="register__input" type="password" label="Пароль" name="password" minLength="8" maxLength="20" required placeholder="Пароль"/>
			</AuthProfile>
		</main>
	);
}

export default Register;