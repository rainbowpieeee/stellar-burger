import { TIngredient } from "../services/types/data"
import Api from "./Api"

export const uid = (): number => { return Date.now() * Math.random() }

export const calculateCost = (elements: Array<TIngredient>, bunPrice: number = 0): number => {
  return (2 * bunPrice) + elements.reduce((res, item) => {
    return res + item.price
  }, 0)
}

export function setCookie(name: string, value: string, props?: { [key in any]: any } | { [key in any]: never }) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')

  );

  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name: string) {
  setCookie(name, "", {
    'max-age': -1
  })
}


export  function refreshMainToken() {

  const match = getCookie('refreshToken');
  match !== undefined &&  Api.refreshToken(match).then(res => { setCookie('token', res.accessToken.split('Bearer ')[1]); setCookie('refreshToken', res.refreshToken) })
}



