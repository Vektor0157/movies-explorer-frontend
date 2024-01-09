import React from "react";
import { useState } from "react";
import "./RegisterForm.css";
import RegisterField from "./RegisterField/RegisterField";
import { nameRegex, emailRegex } from "../../../utils/contants";

const RegistrationForm = ({ button, onSubmit }) => {
	const [values, setValues] = useState({});
	const [errors, setErrors] = useState({});
	const [isValid, setIsValid] = useState(false);
	const [responseMessage, setResponseMessage] = useState("");

	const handleChange = (evt) => {
		const { name, value } = evt.target;
		setValues({ ...values, [name]: value });
		setErrors({ ...errors, [name]: evt.target.validationMessage });
		setIsValid(evt.target.closest("form").checkValidity());
	};

	const handleEmailChange = (evt) => {
		handleChange(evt);
		const { name, value } = evt.target;
		if (name === "email" && !emailRegex.test(value)) {
			setIsValid(false);
			setErrors({
				...errors,
				email: "Введите email в формате address@domain.com",
			});
		}
	};

	const handleNameChange = (evt) => {
		handleChange(evt);
		const { name, value } = evt.target;
		if (name === "name" && evt.target.value.length < 2) {
			setIsValid(false);
			setErrors({ ...errors, name: "Имя должно иметь не менее 2 символов" });
		} else if (name === "name" && !nameRegex.test(value)) {
			setIsValid(false);
			setErrors({
				...errors,
				name: "Имя может содержать только латиницу, кириллицу, пробел или дефис.",
			});
		}
	};

	const handlePasswordChange = (evt) => {
		handleChange(evt);
		const { name } = evt.target;
		if (name === "password" && evt.target.value.length < 2) {
			setIsValid(false);
			setErrors({
				...errors,
				password: "Пароль должен иметь не менее 2 символов",
			});
		}
	};

	const getErrorMessage = (status, defaultText) => {
		switch (status) {
			case 409:
				return "Пользователь с таким email уже существует.";
			case 500:
				return "На сервере произошла ошибка.";
			default:
				return defaultText;
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(values.name, values.email, values.password).catch((err) => {
			const message = getErrorMessage(
				err.status,
				"Произошла ошибка при регистрации пользователя",
			);
			setResponseMessage(message);
			setIsValid(false);
		});
	};

	return (
		<>
			<section className="register-form">
				<div className="register-form__container">
					<form className="register-form__content" name="register" onSubmit={handleSubmit} noValidate>
						<RegisterField label="Имя" name="name" placeholder="Введите имя" type="text" handleChange={handleNameChange} values={values} errors={errors}/>
						<RegisterField label="E-mail" name="email" placeholder="Введите e-mail" type="email" handleChange={handleEmailChange} values={values} errors={errors}/>
						<RegisterField label="Пароль" name="password" placeholder="Введите пароль" type="password" handleChange={handlePasswordChange} values={values} errors={errors}/>
						<p className="register-field__input-error">{!isValid && responseMessage}</p>
						<button type="submit" className={ !isValid ? "register-form__submit-button link register-form__submit-button_disabled" : "register-form__submit-button link"} disabled={!isValid}>{button}</button>
					</form>
				</div>
			</section>
		</>
	);
};

export default RegistrationForm;
