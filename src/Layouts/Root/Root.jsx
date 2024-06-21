import { Outlet } from 'react-router-dom';

const Root = () => {
  return (
    <div> 



        <h2>root page is loading </h2>
        <Outlet />
    </div>
  );
};

export default Root;
