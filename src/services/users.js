import callAPI from './api.js';

export const register = async newUser => {
  console.log(JSON.stringify(newUser))
  const res = await callAPI(`/users`, 'POST', JSON.stringify(newUser));
  console.log("RES")
  console.log(res)
  if (res.status != 200) {
    return null;
  }
  return await res.json();
};

export const login = async (email, password, role) => {
  const res = await callAPI(
    '/users/login',
    'POST',
    JSON.stringify({ email, password, role })
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
