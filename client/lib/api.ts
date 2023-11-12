import axios from 'axios';

export const SERVICE_URI: string = 'http://127.0.0.1:8000';

const instance = axios.create({ baseURL: SERVICE_URI });

export default instance;
