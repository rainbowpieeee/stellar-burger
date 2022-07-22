import { getCookie } from "./utils";


const BASEURL = 'https://norma.nomoreparties.space/api/';

type baseUrl = { url: string };


class Api {
  private url: string;
  private headers: { [name: string]: string };
  constructor({ url }: baseUrl) {
    this.url = url;
    this.headers = {
      'Content-Type': 'application/json',
    }
  }

  private checkResponse(res: Response) {

    if (res.ok) { return res.json() } res.json().then(res => Promise.reject(res))

  }


  getBurgerIngredientsData() {
    return fetch(`${this.url}ingredients`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }).then(this.checkResponse)
  }

  getOrderNumber(arrayOfId: Array<string>, token: string) {
    return fetch(`${this.url}orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ "ingredients": arrayOfId })
    }).then(this.checkResponse);
  }

  setPasswordReset(email: string, token: string) {
    return fetch(`${this.url}password-reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ "email": email })
    }).then(this.checkResponse);
  }

  setNewPassword(password: string, token: string) {
    return fetch(`${this.url}password-reset/reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        "password": password,
        "token": token
      })
    }).then(this.checkResponse);
  }

  createNewUser(email: string, password: string, name: string, token: string) {
    return fetch(`${this.url}auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        "email": email,
        "password": password,
        "name": name
      })
    }).then(this.checkResponse);
  }

  loginRequest(email: string, password: string, token: string) {
    return fetch(`${this.url}auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        "email": email,
        "password": password,
      })
    }).then(this.checkResponse);
  }

  refreshToken(token: string) {
    return fetch(`${this.url}auth/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "token": token })
    }).then(this.checkResponse);
  }

  logoutRequest(match: string) {
    return fetch(`${this.url}auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + match
      },
      body: JSON.stringify({ "token": match })
    }).then(this.checkResponse);
  }

  getUser(token: string) {
    return fetch(`${this.url}auth/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    }).then(this.checkResponse)
  }

  refreshUser(email: string, password: string, name: string, token: string) {
    return fetch(`${this.url}auth/user`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        "email": email,
        "password": password,
        "name": name
      })
    }).then(this.checkResponse);


  }

}

export default new Api({
  url: BASEURL
})


