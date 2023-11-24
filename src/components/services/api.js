import axios from 'axios';

const api = axios.create({
    baseURL: "http://192.168.0.78:9100"
})

api.interceptors.request.use(
    (config) => {
        const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJUaUdlc3RvciIsInN1YiI6IlRpR2VzdG9yIiwiZXhwIjoxNzAwODQxNzEwLCJpZF91c3VhcmlvIjoxMjh9.e-M7zm49hNxrbwtZZt-Oi72cN2SVxCoKsyDE8pW97Fg";

        config.headers.Authorization = `Bearer ${token}`;
        return config;
    }
);

export default api;