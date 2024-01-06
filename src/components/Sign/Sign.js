import './Sign.css';
import React from "react";
import logo from '../../images/logo.svg';

function Sign(props) {
    return (
        <section className='sign'>
            <a href='/'>
                <img className='header__logo' alt='Логотип' src={logo} />
            </a>
            <h2 className='sign__title'>{props.title}</h2>
            <form
                className='sign__form'
                onSubmit={props.onSubmit}
            >
                <div className={props.class}>
                    {props.children}
                    <label className='sign__item'>
                        <p className='sign__info'>E-mail</p>
                        <input
                            className='sign__input'
                            name='email'
                            type='email'
                            autoComplete='email'
                            size='30'
                            minLength='2'
                            maxLength='30'
                            required
                            placeholder={"Введите еmail"}
                            defaultValue={props.email || ''}
                            onChange={props.onChange}
                        />
                        <span className={`sign__input-error ${props.errors.email ? 'sign__input-error-display' : ''}`}>{props.errors.email}</span>
                    </label>
                    <label className='sign__item'>
                        <p className='sign__info'>Пароль</p>
                        <input
                            className='sign__input'
                            name='password'
                            type='password'
                            minLength='8'
                            size='25'
                            required
                            placeholder={"Введите пароль"}
                            defaultValue={props.password || ''}
                            onChange={props.onChange}
                        />
                        <span className={`sign__input-error ${props.errors.password ? 'sign__input-error-display' : ''}`}>{props.errors.password}</span>
                    </label>
                </div>
                <button className={`sign__submit button__hover ${props.isValid ? "" : "sign__button_disabled"}`} type="submit" disabled={props.isValid ? '' : true}>
                    {props.buttonText}
                </button>
                <p className='sign__text'>
                    {props.text} <a className='sign__link' href={props.link}>{props.linkText}</a>
                </p>
            </form>
        </section>
    )
}
export default Sign;