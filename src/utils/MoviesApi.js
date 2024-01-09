class MoviesApi {
	constructor(options) {
		this.movieUrl = options.movieUrl;
		this._headers = options.headers;
	}

	_checkData(res) {
		if (res.ok) {
			return res.json();
		}
		return Promise.reject(`Ошибка: ${res.status} ${res.message}`);
	}

	getMovies() {
		return fetch(`${this.movieUrl}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		}).then((res) => this._checkData(res));
	}
}

const apiMovies = new MoviesApi({
	movieUrl: 'https://api.nomoreparties.co/beatfilm-movies',
	headers: {
		"Content-Type": "application/json",
	},
});

export default apiMovies;
