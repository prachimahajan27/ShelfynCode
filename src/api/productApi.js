import axios from "axios";

const BASE_URL = "http://localhost:8080/api/products";

export const getProducts = () => axios.get(BASE_URL);

export const addProduct = (data) => axios.post(BASE_URL, data);

export const deleteProduct = (id) =>
  axios.delete(`${BASE_URL}/${id}`);

export const toggleFavorite = (id) =>
  axios.patch(`${BASE_URL}/${id}/favorite`);

export const getStats = () =>
  axios.get(`${BASE_URL}/stats`);