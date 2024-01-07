class MoviesApi {
	constructor(options) {
		this.baseUrl = options.baseUrl;
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

	getMovies() {
		return fetch(`${this.baseUrl}/beatfilm-movies`, {
			headers: this.headers,
		})
		.then((res) => this._checkData(res));
	}
}

const apiMovies = new MoviesApi({
	baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
});

export default apiMovies;
