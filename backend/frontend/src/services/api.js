// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getUsers = () => {
    return axios.get(`${API_URL}/users`);
};

export const getUser = (userId) => {
    return axios.get(`${API_URL}/users/${userId}`);
};

export const createUser = (user) => {
    return axios.post(`${API_URL}/users`, user);
};
