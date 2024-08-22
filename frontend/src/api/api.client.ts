import axios, {AxiosInstance} from 'axios';

const ApiClient: AxiosInstance = axios.create({
    baseURL: (import.meta as any).env.VITE_API_BASE_URL || 'http://localhost:3000/',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the Authorization header
ApiClient.interceptors.request.use(config => {
    const token: string | null = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

ApiClient.interceptors.response.use(response => {
    return response.data;
}, error => {
    const message = error.response?.data?.message || 'Something went wrong';
    return Promise.reject({
        message,
        status: error.response?.status,
    });
});

export default ApiClient;