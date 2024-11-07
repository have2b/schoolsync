import axios from 'axios';

axios.defaults.baseURL = process.env.API_URL || 'http://localhost:3000/api'; // Set the base URL for all requests

export default axios;
