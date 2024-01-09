import React from "react";
import "./RegisterField.css";

const RegistrationField = ({ label, name, placeholder, type, errors, handleChange, values }) => {
	return (
		<>
			<div className="register-field">
				<label className="register-field__label">{label}</label>
				<input className="register-field__form-field" name={name} type={type} placeholder={placeholder} minLength="2" maxLength="40" required onChange={handleChange} value={values[name] || ""}/>
				{errors && (
					<span className="register-field__input-error">{errors[name]}</span>
				)}
			</div>
		</>
	);
};

export default RegistrationField;
