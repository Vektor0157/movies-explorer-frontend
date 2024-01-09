import "./Main.css";
import Header from "../Header/Header";
import HeaderAuthAcc from "../HeaderAuthAcc/HeaderAuthAcc";
import Footer from "../Footer/Footer";
import Promo from "../Promo/Promo";
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';

const Main = ({ isLoggedIn }) => {
	return (
		<>
			{isLoggedIn ? <HeaderAuthAcc /> : <Header />}
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
			<Footer />
		</>
	)
}
export default Main;