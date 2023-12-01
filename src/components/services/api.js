import axios from 'axios';

export const api_empreendimento = axios.create({
    baseURL: "http://192.168.0.78:9100"
})

export const api_imoveis = axios.create({
    baseURL: "http://192.168.0.78:9200"
})


api_empreendimento.interceptors.request.use(
    (config) => {
        const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJUaUdlc3RvciIsInN1YiI6IlRpR2VzdG9yIiwiZXhwIjoxNzAxNTE4ODUyLCJpZF91c3VhcmlvIjoxMjh9.tHzORaLr7MWz88XKFc7OVXi0cVQbA-gjl3H3kt6ermA";

        config.headers.Authorization = `Bearer ${token}`;
        return config;
    }
);


api_imoveis.interceptors.request.use(
    (config) => {
        const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJUaUdlc3RvciIsInN1YiI6IlRpR2VzdG9yIiwiZXhwIjoxNzAxNTE4ODUyLCJpZF91c3VhcmlvIjoxMjh9.tHzORaLr7MWz88XKFc7OVXi0cVQbA-gjl3H3kt6ermA";

        config.headers.Authorization = `Bearer ${token}`;
        return config;
    }
);


