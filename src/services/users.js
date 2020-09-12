import callAPI from './api.js';

export const register = async newUser => {
  const res = await callAPI(`/users/`, 'POST', JSON.stringify(newUser));
  if (res.status != 201) {
    return null;
  }
  return res.json();
};

export const login = async (email, password) => {
  const res = await callAPI(
    '/users/login',
    'POST',
    JSON.stringify({ email, password })
  );
  if (res.status != 200) {
    return null;
  }
  return await res.json();
};

export const getUser = async userId => {
  const res = await callAPI(`/users/${userId}`, 'GET');
  if (res.status != 200) {
    return null;
  }
  return await res.json();
};

export const updateUser = async (userId, updatedProfile) => {
  const res = await callAPI(
    `/users/${userId}`,
    'PUT',
    JSON.stringify(updatedProfile)
  );
  if (res.status != 200) {
    return null;
  }
  return await res.json();
};

export const logout = () => {
  if (localStorage.getItem('token') != null) {
    localStorage.removeItem('token');
  }
};
