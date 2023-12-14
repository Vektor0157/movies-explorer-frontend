import React from 'react';
import './Login.css';
import AuthProfile from '../AuthProfile/AuthProfile';
import Input from '../Input/Input';

function Login() {
	return (
		<main className='login'>
			<AuthProfile title="Рады видеть!" name="login" ariaLabel="Войти" gray="Ещё не зарегистрированы?" blue="Регистрация" link="/signup">
				<Input id="email" name="email" className="login__input" type="email" label="Email" required placeholder="Email"/>
				<Input id="password" className="login__input" type="password" label="Пароль" name="password" minLength="8" maxLength="20" required placeholder="Пароль"/>
			</AuthProfile>
		</main>
	);
}

export default Login;