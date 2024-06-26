import axios from 'axios';

const axiosSecure = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  withCredentials: true,
});

const server = () => {
  axiosSecure.interceptors.response.use(
    res => {
      console.log('message from interceptors');
      return res;
    },
    error => {
      console.log('error from axios interceptor', error);
    }
  );

  return axiosSecure;
};

export default server;
