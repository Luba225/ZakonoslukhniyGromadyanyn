import axios from 'axios';

// ⚠️ Change IP на current адресу
const API_URL = 'http://192.168.1.100:3000';

export async function registerUser(userData) {
  const res = await axios.post(`${API_URL}/users`, userData);
  return res.data;
}

export async function getUsers() {
  const res = await axios.get(`${API_URL}/users`);
  return res.data;
}
