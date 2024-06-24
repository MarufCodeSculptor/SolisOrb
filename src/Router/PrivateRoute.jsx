import { useContext } from 'react';
import { CredContext } from '../Providers/AuthProvider/CredProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(CredContext);
  const location = useLocation();
  if (loading) {
    return <p> loading... </p>;
  }

  if (user) {
    return children;
  }

  return (
    <Navigate to="/login" state={location.pathname} replace={true}></Navigate>
  );
};

export default PrivateRoute;
