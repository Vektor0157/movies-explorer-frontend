import './Main.css'
import Promo from "../Promo/Promo";
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';

function Main() {
	return (
		<main className="content">
			<div className="background-green">
				<Promo />
			</div>
			<AboutProject />
			<div className="background-gray">
				<Techs />
			</div>
			<AboutMe />
			<Portfolio />
		</main>
	)
}
export default Main;