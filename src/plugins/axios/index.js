import axios from 'axios';
import router from "../../router/router";
import Vue from "vue";
import authService from "../../core/services/authService";

const API_ENDPOINT = process.env.API_HOST || 'http://localhost:3000/';

let config = {
  baseURL: API_ENDPOINT,
};

const axiosClient = axios.create(config);

axiosClient.interceptors.request.use(config => {
  if (authService.loggedIn()) {
    config.headers.Authorization = `Bearer ${authService.getToken()}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error && error.response && error.response.status === 401) {
      router.push('/login')
    }
    return Promise.reject(error);
  }
);

export default axiosClient;

Vue.use({
  install(Vue) {
    Vue.prototype.$http = axiosClient;
  }
});