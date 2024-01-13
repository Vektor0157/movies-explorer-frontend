import { Link, useNavigate } from 'react-router-dom';
import './NotFound.css';

function ErrorNotFound() {
	const navigate = useNavigate();
	const handleBackpage  = () => {
		navigate(-1);
	}

	return (
		<main className='error-not-found'>
			<h1 className='error-not-found__number'>404</h1>
			<p className='error-not-found__paragraph'>Страница не найдена</p>
			<Link className='error-not-found__link' onClick={handleBackpage}>Назад</Link>
		</main>
	)
}

export default ErrorNotFound;