import axios from 'axios';
import {REACT_APP_SERVER_BASE_URL, REACT_APP_PROD_SERVER_BASE_URL} from '@env';
import useAuthStore from '../store/authStore';

const request = axios.create({
  baseURL: REACT_APP_SERVER_BASE_URL,
});

request.interceptors.request.use(
  async function (config) {
    // Do something before request is sent
    const {accessToken} = useAuthStore.getState();

    config.headers['Authorization'] = `Bearer ${accessToken}`;
    config.headers['ngrok-skip-browser-warning'] = 'some';
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

export {request};
