import "./Footer.css";
import { Link, useLocation } from 'react-router-dom';

function Footer() {
	const location = useLocation();
	const isMoviesPage = location.pathname === '/movies';
	return (
		<footer className={`footer ${isMoviesPage ? 'movies-footer' : ''}`}>
			<h3 className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
			<div className="footer__container">
				<p className="footer__year">©2023</p>
				<Link href="https://practicum.yandex.ru" className="footer__link" target="_blank" rel="noreferrer">Яндекс.Практикум</Link>
				<Link href="https://github.com/Vektor0157" className="footer__link" target="_blank" rel="noreferrer">Github</Link>
			</div>
		</footer>
	);
}

export default Footer;
