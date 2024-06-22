import { createBrowserRouter } from 'react-router-dom';
import Root from '../Layouts/Root/Root';
import Login from '../Pages/Login/Login';
import Registration from '../Pages/Registration/Registration';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <h3> page not found </h3>,
    children: [
      {
        path: '/',
        element: <h4> this is from home </h4>,
      },
      {
        path: '/login',
        element: <Login></Login>,
      },
      {
        path: '/register',
        element:<Registration></Registration>,
      },
    ],
  },
]);
export default router;
