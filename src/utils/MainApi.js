class Api {
	constructor(options) {
		this.baseUrl = options.baseUrl;
		this._headers = options.headers;
	}

	_checkData(res) {
		if (res.ok) {
			return res.json();
		}
		return Promise.reject({ status: res.status, message: res.message });
	}

	getUserInfo() {
		return fetch(`${this.baseUrl}/users/me`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("jwt")}`,
			},
		})
		.then(this._checkData)
		.then((data) => {
			return data;
		});
	}

	editUserInfo({ name, email }) {
		return fetch(`${this.baseUrl}/users/me`, {
			method: "PATCH",
			headers: {
				...this._headers,
				Authorization: `Bearer ${localStorage.getItem("jwt")}`,
			},
			body: JSON.stringify({
				name,
				email,
			}),
		}).then((res) => this._checkData(res));
	}

	getSavedMovies() {
		return fetch(`${this.baseUrl}/movies`, {
			method: "GET",
			headers: {
				...this._headers,
				Authorization: `Bearer ${localStorage.getItem("jwt")}`,
			},
		}).then((res) => this._checkData(res));
	}

	addMovie(movieInfo) {
		return fetch(`${this.baseUrl}/movies`, {
			method: "POST",
			headers: {
				...this._headers,
				Authorization: `Bearer ${localStorage.getItem("jwt")}`,
			},
			body: JSON.stringify({
				...movieInfo,
			}),
		}).then((res) => this._checkData(res));
	}

	removeMovie(movieId) {
		return fetch(`${this.baseUrl}/movies/${movieId}`, {
			method: "DELETE",
			headers: {
				...this._headers,
				Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
		}).then((res) => this._checkData(res));
	}

	register(name, email, password) {
		const data = { name, email, password };
		return fetch(`${this.baseUrl}/signup`, {
			method: "POST",
			headers: this._headers,
			body: JSON.stringify(data),
		}).then((res) => this._checkData(res));
	}

	login(email, password) {
		const data = { email, password };
		return fetch(`${this.baseUrl}/signin`, {
			method: "POST",
			headers: this._headers,
			body: JSON.stringify(data),
			mode: "cors",
		}).then((res) => this._checkData(res));
	}

	setToken() {
		this._headers["Authorization"] = `Bearer ${localStorage.getItem("jwt")}`;
	}
}

const api = new Api({
	baseUrl: 'https://api.vmovies.nomoredomainsmonster.ru',
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
});

export default api;