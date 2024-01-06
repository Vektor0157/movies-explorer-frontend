import Sign from '../Sign/Sign';
import './Register.css';
import React, { useState } from 'react';
import isEmail from 'validator/es/lib/isEmail';

function Register({ onRegister }) {
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
		onRegister(formValue);
	};

	return (
		<main className='register'>
			<section className='register__form'>
				<Sign title={'Добро пожаловать!'} buttonText={'Зарегистрироваться'} text={'Уже зарегистрированы?'} linkText={'Войти'} link={'./sign-in'} class={'sign__set'} onSubmit={handleSubmit} email={formValue.email} password={formValue.password} onChange={handleChange} isValid={isValid} errors={errors}>
					<label className='sign__item'>
						<p className='sign__info'>Имя</p>
						<input className='sign__input' name='name' type='text' size='15' minLength='2' maxLength='30' required onChange={handleChange} placeholder={"Введите имя"} defaultValue={formValue.name || ""}/>
						<span className={`sign__input-error ${errors.name ? 'sign__input-error-display' : ''}`}>{errors.name}</span>
					</label>
				</Sign>
			</section>
		</main>
	)
};
export default Register;