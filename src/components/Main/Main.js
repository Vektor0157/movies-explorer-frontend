import Header from "../Header/Header";
import HeaderAuthorized from "../HeaderAuthorized/HeaderAuthorized";
import Footer from "../Footer/Footer";
import Promo from "../Promo/Promo";
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';

const Main = ({ isLoggedIn }) => {
	return (
		<>
			{isLoggedIn ? <HeaderAuthorized /> : <Header />}
			<main className="content">
				<Promo />
				<AboutProject />
				<Techs />
				<AboutMe />
				<Portfolio />
			</main>
			<Footer />
		</>
	)
}
export default Main;