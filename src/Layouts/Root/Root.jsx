import { Outlet } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
const Root = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <Navbar />
      <div className='min-h-[calc(100vh-306px)]'>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
export default Root;
