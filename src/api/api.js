import axios from 'axios';

// const API_URL = 'API_URL';
const API_URL = 'https://social-media-dashboard-backend-1.onrender.com';

const handleAxiosError = (error) => {
  if (error.response) {
    console.error('Server responded with a status other than 2xx:', error.response.status);
    console.error('Response data:', error.response.data);
  } else if (error.request) {
    console.error('Request was made but no response was received:', error.request);
  } else {
    console.error('Error in setting up the request:', error.message);
  }
  console.error('Error config:', error.config);
};

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
  return axios.post(`${API_URL}/login`, { login: loginInput, password }).catch(handleAxiosError);
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