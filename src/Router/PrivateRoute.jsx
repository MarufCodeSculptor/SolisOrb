import { useContext } from 'react';
import { CredContext } from '../Providers/AuthProvider/CredProvider';
import { Navigate, useLocation } from 'react-router-dom';


const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(CredContext);
  const location = useLocation();
  if (loading) {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center">
          <h2 className="text-5xl font-bold">Loading ...</h2>
        </div>
      </>
    );
  }

  if (user) {
    return children;
  }

  return (
    <Navigate to="/login" state={location.pathname} replace={true}></Navigate>
  );
};



export default PrivateRoute;
