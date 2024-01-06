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

	editUserInfo(name, email) {
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'PATCH',
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: name,
				email: email,
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

	createSavedMovie(data) {
		return fetch(`${this._baseUrl}/movies`, {
			method: 'POST',
			credentials: "include",
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				country: data.country,
				director: data.director,
				duration: data.duration,
				year: data.year,
				description: data.description,
				image: data.image,
				trailerLink: data.trailerLink,
				thumbnail: data.thumbnail,
				movieId: data.movieId,
				nameRU: data.nameRU,
				nameEN: data.nameEN
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