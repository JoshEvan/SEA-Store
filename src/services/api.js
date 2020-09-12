export default async (url, method, body) => {
  let API_URL = process.env.REACT_APP_API_URL.trim()
  console.log("requesting")
  console.log(`${API_URL}${url}`)
  return await fetch(`${API_URL}${url}`, {
    method: method,
    body: body,
    headers: {
      Authorization:  `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
  });
};
