class Api {
	constructor(config) {
		this._baseUrl = config.baseUrl;
	}

	_checkData (res) {
	if (!res.ok) {
		return Promise.reject(`Ошибка: ${res.status}`);
	}
	return res.json();
	}

	getUserInfo() {
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
				'Content-Type': 'application/json'
			}
		})
		.then((res) => this._checkData(res));
	}

	editUserInfo(user) {
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'PATCH',
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: user.name,
				email: user.email,
			})
		})
		.then((res) => this._checkData(res));
	}

	getSavedMovies() {
		return fetch(`${this._baseUrl}/movies`, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
				'Content-Type': 'application/json'
			}
		})
		.then((res) => this._checkData(res));
	}

	createSavedMovie({trailerLink, movieId, country, director, duration, description, year, nameRU, nameEN}) {
		return fetch(`${this._baseUrl}/movies`, {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				image: `https://api.nomoreparties.co${movieId.image.url}`,
				thumbnail: `https://api.nomoreparties.co${movieId.image.formats.thumbnail.url}`,
				trailerLink,
				movieId,
				country,
				director,
				duration,
				description,
				year,
				nameRU,
				nameEN,
			}),
		})
		.then((res) => this._checkData(res));
	}

	deleteSaved(movieId) {
		return fetch(`${this._baseUrl}/movies/${movieId}`, {
			method: 'DELETE',
			headers: {
				'authorization': `Bearer ${localStorage.getItem('jwt')}`,
				'Content-Type': 'application/json'
			}
		})
		.then((res) => this._checkData(res));
	}
}

const api = new Api({
	baseUrl: 'https://api.vmovies.nomoredomainsmonster.ru',
	headers: {
		'Content-Type': 'application/json'
	}
});

export default api;