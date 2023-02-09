import axios from 'axios';
import configFile from '../config.json';

const http = axios.create({
  baseURL: configFile.apiEndpoint,
});

http.interceptors.response.use(
  (res) => {
    res.data = { content: res.data };
    return res;
  },
  (error) => {
    const expectedErrors = error.response && error.response.status >= 400 && error.response.status < 500;

    if (!expectedErrors) {
      console.log(error);
    }
    return Promise.reject(error);
  },
);

const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete,
  patch: http.patch,
};

export default httpService;
