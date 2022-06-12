const baseUrl = 'https://norma.nomoreparties.space/api/';


class Api {
    constructor({ url }) {
        this._url = url;
        this._headers = {
            'Content-Type': 'application/json'
        }
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
    }


    getBurgerIngredientsData() {
        return fetch(`${this._url}ingredients`, {
            method: 'GET',
            headers: this._headers
        }).then(this._checkResponse)
    }

    getOrderNumber(arrayOfId) {
        return fetch(`${this._url}orders`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({ "ingredients": arrayOfId })
        }).then(this._checkResponse);
    }





}

export default new Api({
    url: baseUrl
})