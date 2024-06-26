import { createBrowserRouter } from 'react-router-dom';
import Root from '../Layouts/Root/Root';
import Login from '../Pages/Login/Login';
import Registration from '../Pages/Registration/Registration';
import Home from '../Pages/Home/Home';
import JobDetails from '../Components/JobCard/JobsDetails';
import getJob from '../Hooks/getJob';
import AddJobs from '../Pages/AddJobs/AddJobs';
import ErrorPage from '../Pages/NotFound/ErrorPage';
import MyPostedJobs from '../Pages/MypostedJob/MypostedJob';
import UpdateJob from '../Pages/Update/UpdateJob';
import server from '../Hooks/axioxSecure';
import PrivateRoute from './PrivateRoute';
import MyBids from '../Pages/MyBids/MyBids';
import BidRequests from '../Pages/BidRequest/BidRequest';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },
      {
        path: '/job/:id',
        element: (
          <PrivateRoute>
            <JobDetails />
          </PrivateRoute>
        ),
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
        element: (
          <PrivateRoute>
            <AddJobs></AddJobs>
          </PrivateRoute>
        ),
      },
      {
        path: '/my-posted-jobs',
        element: (
          <PrivateRoute>
            <MyPostedJobs />
          </PrivateRoute>
        ),
      },
      {
        path: '/my-bids',
        element: (
          <PrivateRoute>
            <MyBids></MyBids>
          </PrivateRoute>
        ),
      },
      {
        path: '/bid-request',
        element: (
          <PrivateRoute>
            <BidRequests />
          </PrivateRoute>
        ),
      },
      {
        path: '/update-job/:id',
        element: (
          <PrivateRoute>
            <UpdateJob />
          </PrivateRoute>
        ),
        loader: ({ params }) => server().get(`/job/${params.id}`),
      },
    ],
  },
]);
export default router;
