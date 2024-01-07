class MoviesApi {
	constructor(options) {
		this._baseUrl = options.baseUrl;
		this._headers = options.headers;
		this._auth = options.headers.auth;
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

	getMovies() {
		return fetch(`${this._baseUrl}/beatfilm-movies`, {
			headers: this._headers,
		})
		.then((res) => this._checkData(res));
	}
}

const apiMovies = new MoviesApi({
	baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
});

export default apiMovies;
