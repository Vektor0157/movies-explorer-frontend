export const BASE_URL = 'https://api.vmovies.nomoredomainsmonster.ru';

const checkData = (res) => {
	if (!res.ok) {
		return Promise.reject(`Ошибка: ${res.status}`);
	}
	return res.json();
}

export const register = (name, email, password) => {
	return fetch(`${BASE_URL}/signup`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			name: name,
			email: email,
			password: password
		})
	}).then(checkData);
}

export const getToken = () => {
	return localStorage.getItem('jwt');
};

export const setToken = (jwt) => {
	localStorage.setItem('jwt', jwt);
};

export const removeToken = () => {
	localStorage.removeItem('jwt');
};

export const auth = (email, password) => {
	return fetch(`${BASE_URL}/signin`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			email: email,
			password: password
		})
	}).then(checkData)
	.then((data) => {
		if (data.token) {
			localStorage.setItem('token', data.token);
			return data;
		}
	})
};

export const checkinValidityToken = (jwt) => {
	return fetch(`${BASE_URL}/users/me`, {
		method: 'GET',
		headers: {
			"Accept": 'application/json',
			"Content-Type": "application/json",
			Authorization: `Bearer ${jwt}`,
		},
	}).then(checkData)
	.then((data) => {
		return data;
	})
}