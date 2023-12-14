import React from "react";
import arrow from "../../images/arrow.svg";
import "./Portfolio.css";

function Portfolio() {
	return (
		<section className="portfolio">
			<h3 className="portfolio__title">Портфолио</h3>
			<nav className="portfolio__list">
				<a href="https://github.com/Vektor0157/how-to-learn" className="portfolio__link" target="_blank" rel="noreferrer">
					<p className="portfolio__description">Статичный сайт</p>
					<img className="portfolio__image" src={arrow} alt="Стрелка для ссылки"/>
				</a>
				<a href="https://github.com/Vektor0157/russian-travel" className="portfolio__link" target="_blank" rel="noreferrer">
					<p className="portfolio__description">Адаптивный сайт</p>
					<img className="portfolio__image" src={arrow} alt="Стрелка для ссылки"/>
				</a>
				<a href="https://vektor.nomoredomainsmonster.ru" className="portfolio__link" target="_blank" rel="noreferrer">
					<p className="portfolio__description">Одностраничное приложение</p>
					<img className="portfolio__image" src={arrow} alt="Стрелка для ссылки"/>
				</a>
			</nav>
		</section>
	);
}

export default Portfolio;