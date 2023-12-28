import "./Profile.css"
import React, { useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import CurrentUserContext from '../../contexts/CurrentUserContext';
import {useFormValidation} from '../../hooks/useFormValidation';

function Profile({ onUpdateUser, onLogout, setIsSaveSuccess, setSubmitError }) {
	const currentUser = useContext(CurrentUserContext);
	const { values, handleChange, isValid } = useFormValidation();
	const [isEditing, setIsEditing] = useState(false);
	const [isButtonActive, setIsButtonActive] = useState(false);
	const [isDataChanged, setIsDataChanged] = useState(false);
	const [setDisplayName] = useState('');

	useEffect(() => {
		if (currentUser) {
			setDisplayName(currentUser.name);
			values.name = currentUser.name;
			values.email = currentUser.email;
		}
	}, [currentUser, setDisplayName, values]);

	useEffect(() => {
		if (currentUser) {
			setIsDataChanged(values.name !== currentUser.name || values.email !== currentUser.email);
		}
	}, [currentUser, values.name, values.email]);

	useEffect(() => {
		setIsButtonActive(isValid && values.name && values.email && isDataChanged);
	}, [isValid, values.name, values.email, isDataChanged]);

	const handleEditClick = () => {
		setIsEditing(true);
		setIsSaveSuccess(false);
		setSubmitError('');
	};

	const handleSaveClick = (evt) => {
		evt.preventDefault();
		if (isValid && isButtonActive && isDataChanged) {
			onUpdateUser({
				name: values.name,
				email: values.email,
			});
			setIsEditing(false);
		}
	};

	useEffect(() => {
		setIsButtonActive(isValid && values.name && values.email);
	}, [isValid, values.name, values.email]);

	const handleLogoutClick = () => {
		onLogout();
	};
	return (
		<>
			<section className="profile">
				<h3 className="profile__title">Привет, Виктория!</h3>
				<form id="form" className="profile__form" noValidate onSubmit={handleSaveClick}>
					<label className="profile__label">Имя
						<input id="name" name="name" className="profile__input" type="text" minLength="2" required value={values.name || ''} onChange={handleChange} disabled={!isEditing}/>
						<span className="profile__input-error"></span>
					</label>
					<div className="profile__border"></div>
					<label className="profile__label">E-mail
						<input id="email" name="email" className="profile__input" type="email" required value={values.email || ''} onChange={handleChange} disabled={!isEditing}/>
						<span className="profile__input-error"></span>
					</label>
					<button type="submit" className="profile__button-save" onClick={handleEditClick}>Редактировать</button>
					<Link to="/" onClick={handleLogoutClick} className="profile__exit">Выйти из аккаунта</Link>
				</form>
			</section>
		</>
	)
}

export default Profile
