import { useContext } from 'react';
import { CredContext } from '../Providers/AuthProvider/CredProvider';

const useAuth = () => {
  const auth = useContext(CredContext);
  return auth;
};
export default useAuth;
