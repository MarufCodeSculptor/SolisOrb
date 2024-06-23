import { createBrowserRouter } from 'react-router-dom';
import Root from '../Layouts/Root/Root';
import Login from '../Pages/Login/Login';
import Registration from '../Pages/Registration/Registration';
import Home from '../Pages/Home/Home';
import JobDetails from '../Components/JobCard/JobsDetails';
import getJob from '../Hooks/getJob';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <h3> page not found </h3>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },
      {
        path: '/job/:id',
        element: <JobDetails />,
        loader: getJob,
      },
      {
        path: '/login',
        element: <Login></Login>,
      },
      {
        path: '/register',
        element: <Registration></Registration>,
      },
    ],
  },
]);
export default router;
