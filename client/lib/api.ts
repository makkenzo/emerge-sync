import axios from 'axios';

export const SERVICE_URI: string = 'http://localhost:5000';

const instance = axios.create({ baseURL: SERVICE_URI });

export default instance;
