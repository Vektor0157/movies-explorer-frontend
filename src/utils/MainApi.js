class Api {
	constructor(options) {
		this._baseUrl = options.baseUrl;
		this.headers = options.headers;
	}

	_checkData (res) {
		if (!res.ok) {
			return Promise.reject(`Ошибка: ${res.status}`);
		}
		return res.json();
	}

	_getHeaders() {
		const jwt = localStorage.getItem('jwt');
		return {
			'Authorization': `Bearer ${jwt}`,
			"Content-Type": "application/json",
		};
	}

	getUserInfo() {
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'GET',
			headers:this._getHeaders(),
		})
		.then(this._checkData);
	}

	editUserInfo(user) {
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'PATCH',
			headers:this._getHeaders(),
			body: JSON.stringify({
				name: user.name,
				email: user.email,
			})
		})
		.then(this._checkData);
	}

	getSavedMovies() {
		return fetch(`${this._baseUrl}/movies`, {
			method: 'GET',
			headers:this._getHeaders(),
		})
		.then(this._checkData);
	}

	createSavedMovie(data) {
		return fetch(`${this._baseUrl}/movies`, {
			method: 'POST',
			headers: this._getHeaders(),
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
		.then(this._checkData);
	}

	deleteSaved(movieId) {
		return fetch(`${this._baseUrl}/movies/${movieId}`, {
			method: 'DELETE',
			headers:this._getHeaders(),
		})
		.then(this._checkData);
	}
}

const api = new Api({
	baseUrl: 'https://api.vmovies.nomoredomainsmonster.ru',
});

export default api;