import { NavLink } from 'react-router-dom';
import './NavLinks.css';
import React from 'react';

function NavLinks() {
    return (
        <div className='nav-links'>
            <NavLink to='/sign-up' className='nav-links__register'>Регистрация</NavLink>
            <NavLink to='/sign-in' className='nav-links__login'>Войти</NavLink>
        </div>

    );
};
export default NavLinks;