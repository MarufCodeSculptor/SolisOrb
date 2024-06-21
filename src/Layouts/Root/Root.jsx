import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { CredContext } from '../../Providers/AuthProvider/CredProvider';

const Root = () => {
  const hello=useContext(CredContext);
 
  return (
    <div>
      <h2>root page is loading </h2>
      <Outlet />
    </div>
  );
};

export default Root;
