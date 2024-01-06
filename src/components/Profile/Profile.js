import React, { useContext, useState } from 'react';
import './Profile.css';
import isEmail from 'validator/es/lib/isEmail';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function Profile({ onSignOut, onUpdateUser }) {
	const currentUser = useContext(CurrentUserContext);

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
		if ( currentUser.name !== formValue.name && currentUser.email !== formValue.email) {
			onUpdateUser(formValue.name, formValue.email);
		};
	};

	return (
		<main className='profile'>
			<h1 className='profile__title'>Привет, {currentUser.name}!</h1>
			<form className='profile__form'>
				<div className='profile__info profile__info-top'>
					<label className='profile__placeholder'>Имя</label>
					<input className='profile__input profile__name-input form__name' name="name" id="name-input" type="text" size="15" minLength="2" maxLength="40" required defaultValue={currentUser.name} onChange={handleChange}/>
				</div>
				<span className={`sign__input-error ${errors.name ? 'sign__input-error-display' : ''}`}>{errors.name}</span>
				<div className='profile__info'>
					<label className='profile__placeholder'>Email</label>
					<input className='profile__input profile__email-input form__email' name="email" id="email-input" type="email" autoComplete="email" size="30" minLength="2" maxLength="30" required defaultValue={currentUser.email} onChange={handleChange}/>
				</div>
				<span className={`sign__input-error ${errors.email ? 'sign__input-error-display' : ''}`}>{errors.email}</span>
			</form>
			<button className={`profile__button-change button__hover ${isValid && (formValue.name !== currentUser.name || formValue.email !== currentUser.email) ? "" : "sign__button_disabled" }`}
				type='submit'
				disabled={ !isValid && (formValue.name === currentUser.name || formValue.email === currentUser.email)} onClick={handleSubmit}>Редактировать
			</button>
			<button className='profile__button-exit button__hover' type='button' onClick={onSignOut}>Выйти из аккаунта</button>
		</main>
	);
}

export default Profile;