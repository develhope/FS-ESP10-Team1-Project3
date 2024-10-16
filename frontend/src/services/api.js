// src/services/api.js
import axios from 'axios';

const API_URL = 'https://freelancehub-4tr0.onrender.com//api';

export const getUsers = () => {
    return axios.get(`${API_URL}/users`);
};

export const getUser = (userId) => {
    return axios.get(`${API_URL}/users/${userId}`);
};

export const createUser = (user) => {
    return axios.post(`${API_URL}/users`, user);
};
