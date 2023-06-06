class Api {
  constructor(options) {
    this.options = options;
  }

  getCards() {
    return this.request('/cards');
  }

  getMe() {
    return this.request('/users/me');
  }

  setMe(data) {
    return this.request('/users/me', {
      method: 'PATCH',
      body: this.getBody(data),
    });
  }

  getAllData() {
    return Promise.all([this.getMe(), this.getCards()])
  }

  createCard(data) {
    return this.request('/cards', {
      method: 'POST',
      body: this.getBody(data),
    });
  }

  removeCard(cardId) {
    return this.request(`/cards/${cardId}`, {
      method: 'DELETE',
    });
  }

  like(cardId) {
    return this.request(`/cards/${cardId}/likes`, {
      method: 'PUT',
    });
  }

  dislike(cardId) {
    return this.request(`/cards/${cardId}/likes`, {
      method: 'DELETE',
    });
  }

  setAvatar(avatar) {
    return this.request(`/users/me/avatar`, {
      method: 'PATCH',
      body: this.getBody({ avatar }),
    });
  }

  request(path, init = {}) {
    return fetch(this.options.baseUrl + path, {
      ...init,
      headers: {
        ...this.options.headers,
        ...init.headers,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(res);
        }
      })
  }

  getBody(data) {
    return JSON.stringify(data);
  }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-55',
  headers: {
    'authorization': '9c0c6a9e-7d3d-49e1-be95-1a9e7dd07b2f',
    'Content-Type': 'application/json',
  },
});