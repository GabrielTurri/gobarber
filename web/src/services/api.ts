import axios from 'axios';

const api = axios.create({
  baseURL: 'hhtp://localhost:3333',
});

export default api;
