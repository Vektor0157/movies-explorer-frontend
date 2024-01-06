class MoviesApi {
	constructor(config) {
		this._baseUrl = config.baseUrl;
		this._headers = config.headers;
		this._auth = config.headers.auth;
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

	getSearchMovies() {
		return fetch(this._baseUrl, {
			headers: this._headers,
		})
		.then((res) => this._checkData(res));
	}
}

const apiMovies = new MoviesApi({
	baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
	headers: {
		'Content-Type': 'application/json',
	},
});

export default apiMovies;
