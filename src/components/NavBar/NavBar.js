import './NavBar.css';
import React from 'react';
import profile from '../../images/icon__COLOR_icon-main.svg';
import { NavLink } from 'react-router-dom';
import NavImage from '../../images/icon__COLOR_icon-main-2.svg'
import NavPopup from '../NavPopup/NavPopup';

function NavBar({ isOpen, onClose, onEditNavPopup }) {
    return (
        <>
            <nav className='navbar'>
                <NavLink to='/movies' className='navbar__films'>Фильмы</NavLink>
                <NavLink to='/saved-movies' className='navbar__films'>Сохранённые фильмы</NavLink>
                <NavLink to='/profile' className='navbar__profile'>
                    <p className='navbar__profile-text'>Аккаунт</p>
                    <img className='navbar__profile-image' src={profile} alt='значок аккаунта'></img>
                </NavLink>
            </nav>
            <button className='navbar__button' type='button' onClick={onEditNavPopup}>
                <img className='navbar__icon' src={NavImage} alt='иконка навигации' />
            </button>
            <NavPopup
                isOpen={isOpen}
                onClose={onClose}
            />
        </>
    );
};
export default NavBar;