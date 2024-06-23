import { createBrowserRouter } from 'react-router-dom';
import Root from '../Layouts/Root/Root';
import Login from '../Pages/Login/Login';
import Registration from '../Pages/Registration/Registration';
import Home from '../Pages/Home/Home';
import JobDetails from '../Components/JobCard/JobsDetails';
import getJob from '../Hooks/getJob';
import AddJobs from '../Pages/AddJobs/AddJobs';
import ErrorPage from '../Pages/NotFound/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement:<ErrorPage></ErrorPage>,
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
      {
        path: '/addJobs',
        element:<AddJobs></AddJobs>,
      },
    ],
  },
]);
export default router;
