import axios from "axios";

export const API_URL = "http://localhost:8000";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "application/json",
  },
});

export default class ApiService {
  static pay(data = {}) {
    return api.post(`${API_URL}/payments/pay/`, data);
  }
}
