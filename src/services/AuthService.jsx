import axios from 'axios';

const AuthService = {
  login: async (email, password) => {
    const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
    console.log(response);
    return response.data;
  },
  register: async(formData) =>{
    let errors = [];
    if(formData.password !== formData.confirmPassword){
      errors.push('Passwords do not match');
    }
    if(formData.password.length < 8){
      errors.push('Password must be at least 8 characters long');
    }

    if(errors.length > 0){
      throw new Error(errors.join('\n'));
    }
    const response = await axios.post('http://localhost:5000/api/auth/register', formData);
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
