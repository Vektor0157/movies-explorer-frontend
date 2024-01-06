import './NavPopup.css';
import React from 'react';
import profile from '../../images/icon__COLOR_icon-main.svg';
import { NavLink } from 'react-router-dom';

function NavPopup({ isOpen, onClose }) {
    return (
        <section className={`navPopup ${isOpen ? `navPopup__opened` : ""}`}>
            <button className='navPopup__close' onClick={onClose}></button>
            <nav className='navPopup__container'>
                <NavLink to='/' className='navPopup__text'>Главная</NavLink>
                <NavLink to='/movies' className='navPopup__text'>Фильмы</NavLink>
                <NavLink to='/saved-movies' className='navPopup__text'>Сохранённые фильмы</NavLink>
                <NavLink to='/profile' className='navPopup__profile'>
                    <p className='navPopup__profile-text'>Аккаунт</p>
                    <img className='navPopup__profile-image' src={profile} alt='значок аккаунта'></img>
                </NavLink>
            </nav>
        </section>
    );
};
export default NavPopup;