import React, { useState } from 'react';
import './Login.css';
import Sign from '../Sign/Sign';
import isEmail from 'validator/es/lib/isEmail';

function Login({ onLogin }) {

	const [formValue, setFormValue] = useState({})
	const [errors, setErrors] = useState({});
	const [isValid, setIsValid] = useState(false);

	function handleChange(e) {
		const target = e.target;
		const name = target.name;
		const value = target.value;
		if (name === 'email') {
			if (!isEmail(value)) {
				target.setCustomValidity('Некорректый адрес почты');
			} else {
				target.setCustomValidity('');
			}
		}
		setFormValue({ ...formValue, [name]: value });
		setErrors({ ...errors, [name]: target.validationMessage });
		setIsValid(target.closest('form').checkValidity());
	};

	function handleSubmit(e) {
		e.preventDefault();
		onLogin(formValue);
	};

	return (
		<main className='login'>
			<Sign title={'Рады видеть!'} buttonText={'Войти'} text={'Ещё не зарегистрированы?'} linkText={'Регистрация'} link={'./sign-up'} class={'sign__set login__set'} email={formValue.email} password={formValue.password} isValid={isValid} errors={errors} onSubmit={handleSubmit} onChange={handleChange}></Sign>
		</main>
	);
}

export default Login;