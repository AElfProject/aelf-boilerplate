// TODO: Bind Sentry or firebase Logs
import { AxiosInstance } from 'axios';

export function interceptorsBind(axios: AxiosInstance) {
  axios.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      Promise.reject(error);
    },
  );

  axios.interceptors.response.use(
    (response) => {
      console.log('response', response);
      return response;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
  return axios;
}
