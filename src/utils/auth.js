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
			'Accept': 'application/json',
         'Content-Type': 'application/json'
		},
		body: JSON.stringify({ name, email, password })
	}).then(checkData);
}

export const login = (email, password) => {
	return fetch(`${BASE_URL}/signin`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
            'Content-Type': 'application/json'
		},
		body: JSON.stringify({ email, password })
	}).then(checkData)
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
}