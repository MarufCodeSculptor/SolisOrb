import axios from 'axios';
import useAuth from './useAuth';
const axiosSecure = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { logOut } = useAuth();
  
  axiosSecure.interceptors.response.use(
    res => {
      console.log('log from intercheptor');
      return res;
    },
    async error => {
      if (error.response.status === 401 || error.response.status === 403) {
        logOut();
      }
      return Promise.reject(error);
    }
  );
  // returning  axiossecure => 
  return axiosSecure;
};
export default useAxiosSecure;
