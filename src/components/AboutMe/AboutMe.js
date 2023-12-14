import './AboutMe.css'
import photo from '../../images/me.jpg';

function AboutMe() {
	return (
		<section className="about-me">
			<h2 className="about-me__title">Студент</h2>
			<div className="about-me__container">
				<div className="about-me__description">
					<h3 className="about-me__name">Виктория</h3>
					<h4 className="about-me__job">Веб-разработчик, 19 лет</h4>
					<p className="about-me__text">Я переехала из Калининграда в Москву, учусь в колледже на программиста. Я танцор, уже 13 лет.</p>
					<a href="https://github.com/Vektor0157" className="about-me__link" target="_blank" rel="noreferrer">Github</a>
				</div>
			<img src={photo} alt="Моя фотография" className="about-me__photo" />
			</div>
		</section>
	)
}

export default AboutMe;