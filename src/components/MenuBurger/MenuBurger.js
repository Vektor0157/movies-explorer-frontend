import { Link, useNavigate, useLocation } from 'react-router-dom';
import './MenuBurger.css';

function MenuBurger({ isOpen, onClose }) {
	const navigate = useNavigate();
	const location = useLocation();
	const profilePage = location.pathname === '/profile';
	const moviesPage = location.pathname === '/movies';
	const savedMoviesPage = location.pathname === '/saved-movies';
	const homePage = location.pathname === '/';

	const handleLinkClick = (url) => {
		if (isOpen) {
			onClose();
		}
		navigate(url);
	};

	return (
		<div className={`burger ${isOpen ? 'burger_opened' : ''}`} onClick={onClose}>
			<div className="burger__container">
				<nav className="burger__menu">
					<ul className='burger__menu-all'>
						<li className={`burger-menu-list ${homePage ? 'active' : ''}`}>
							<Link to="/" className="burger-menu-list__item" onClick={() => handleLinkClick('/')}>Главная</Link>
						</li>
						<li className={`burger-menu-list ${moviesPage ? 'active' : ''}`}>
							<Link to="/movies" className="burger-menu-list__item" onClick={() => handleLinkClick('/movies')}>Фильмы</Link>
						</li>
						<li className={`burger-menu-list ${savedMoviesPage ? 'active' : ''}`}>
							<Link to="/saved-movies" className="burger-menu-list__item" onClick={() => handleLinkClick('/saved-movies')}>Сохранённые фильмы</Link>
						</li>
						<li className={`burger-menu-list ${profilePage ? 'active' : ''}`}>
							<Link to="/profile" className="burger-menu-list__item burger-menu-list__item_acount" onClick={() => handleLinkClick('/profile')}>Аккаунт&nbsp;&nbsp;&nbsp;</Link>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	)
}

export default MenuBurger;
