class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return res.json().then((data) => Promise.reject({ status: res.status, message: data.message }));
    }
  }
  getUserInfo() {
    const token = localStorage.getItem('token');
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
      .then(res => this._checkResponse(res));
  }
  editUserInfo(data) {
    const token = localStorage.getItem('token');
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      })
    })
      .then(this._checkResponse);
  }
  getSavedMovies() {
    const token = localStorage.getItem('token');
    return fetch(`${this._url}/movies`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
      .then(res => this._checkResponse(res));
  }

  createSavedMovie(data) {
    const token = localStorage.getItem('token');
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image: `https://api.nomoreparties.co${data.image.url}`,
        thumbnail: `https://api.nomoreparties.co${data.image.formats.thumbnail.url}`,
        trailerLink: data.trailerLink,
        movieId: data.id,
        country: data.country || "Нет",
        director: data.director,
        duration: data.duration,
        description: data.description,
        year: data.year,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
      }),
    })
      .then(this._checkResponse);
  }
  deleteSaved(movieId) {
    const token = localStorage.getItem('token');
    return fetch(`${this._url}/movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: 'https://api.vmovies.nomoredomainsmonster.ru',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;