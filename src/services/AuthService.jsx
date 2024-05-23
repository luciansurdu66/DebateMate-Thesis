import axios from 'axios';

const AuthService = {
  login: async (email, password) => {
    const response = await axios.post('http://localhost:5000/api/login', { email, password });
    return response.data;
  },
  register: async(formData) =>{
    const response = await axios.post('http://localhost:5000/api/register', formData);
    return response.data;
  },
  setAuthHeader: (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = token;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  },
};

export default AuthService;
