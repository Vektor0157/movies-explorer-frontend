import './Promo.css';
import promo from '../../images/PromoLogo.png';

function Promo () {
	return (
		<section className="promo">
			<h1 className='promo__title'>Учебный проект студента факультета Веб&#8209;разработки.</h1>
			<p className='promo__subtitle'>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
			<button className="promo__button"> <a className='promo__link' href='https://practicum.yandex.ru/'>Узнать больше </a></button>
			<img className="promo__image" src={promo} alt="картинка земли"/>
		</section>
	)
}

export default Promo;