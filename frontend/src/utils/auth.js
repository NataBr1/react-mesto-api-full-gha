function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

// export const BASE_URL = 'https://auth.nomoreparties.co';
export const BASE_URL = 'http://localhost:3000';

export const register = ( password, email ) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({password, email})
  })
  .then(checkResponse)
};

export const authorize  = ( password, email ) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({password, email})
  })
  .then(checkResponse)
};

export const checkToken = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // "Authorization": `Bearer ${token}`
    },
    credentials: 'include'
  })
  .then(checkResponse)
};
