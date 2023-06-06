import connectAuth from './connectAuth';

class Auth {
    constructor(connect) {
        this._baseUrl = connect.baseUrl;
    }

    _checkResponse(result) {
        if (result.ok) {
            return result.json();
        }
        return Promise.reject(`Ошибка: ${result.status}`);
    }

    register(email, password) {
        return fetch(`${this._baseUrl}/signup`, {
          method: 'POST',
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password })
        })
        .then(this._checkResponse)
      };
    
      authorize(email, password) {
        return fetch(`${this._baseUrl}/signin`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password })
        })
        .then(this._checkResponse)
      };
    
      checkToken(token) {
        return fetch(`${this._baseUrl}/users/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(this._checkResponse)
      }
}

const auth = new Auth(connectAuth);

export default auth;