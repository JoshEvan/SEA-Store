export default async (url, method, body) => {
  return await fetch(`${process.env.API_URL}/${url}`, {
    method: method,
    body: body,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};
