import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const getMetrics = () => {
  const token = localStorage.getItem('token');
  console.log('Sending request with token:', token);
  return axios.get(`${API_URL}/metrics`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
};
export const addMetric = (metric, token) => {
  return axios.post(`${API_URL}/metrics`, metric, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
};


export const updateMetric = (id, metric, token) => {
  return axios.put(`${API_URL}/metrics/${id}`, metric, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
};

export const deleteMetric = (id, token) => {
  return axios.delete(`${API_URL}/metrics/${id}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
};

export const login = (loginInput, password) => {
  return axios.post(`${API_URL}/login`, { login: loginInput, password });
};


export const register = (username, email, password, fullName, dateOfBirth) => {
  return axios.post(`${API_URL}/register`, { username, email, password, fullName, dateOfBirth });
};



export const getUserDetails = () => {
  const token = localStorage.getItem('token');
  return axios.get(`${API_URL}/user`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
};

export const updateUserDetails = (userDetails) => {
  const token = localStorage.getItem('token');
  return axios.put(`${API_URL}/user`, userDetails, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
};

export const uploadProfilePic = async (formData) => {
  const token = localStorage.getItem('token');
  return axios.post(`${API_URL}/upload-profile-pic`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`
    }
  });
};