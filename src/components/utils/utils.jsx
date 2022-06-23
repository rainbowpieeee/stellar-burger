export const burgerIngredientsUrl = 'https://norma.nomoreparties.space/api/ingredients';

export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  // если ошибка, отклоняем промис
  return Promise.reject(`Ошибка: ${res.status}`);
}
