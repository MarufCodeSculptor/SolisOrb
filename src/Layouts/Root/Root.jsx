import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { CredContext } from '../../Providers/AuthProvider/CredProvider';
import Navbar from '../../Components/Navbar/Navbar';

const Root = () => {
  const {signInWithGoogle}=useContext(CredContext);
 console.log(signInWithGoogle);
  return (
    <div className='max-w-6xl mx-auto'>
      <Navbar/>
      <Outlet />
    </div>
  );
};

export default Root;
