import axios from 'axios';

const API_URL = 'http://192.168.1.100:3000';

export async function createViolation(data) {
  const res = await axios.post(`${API_URL}/violations`, data);
  return res.data;
}

export async function getViolations() {
  const res = await axios.get(`${API_URL}/violations`);
  return res.data;
}
