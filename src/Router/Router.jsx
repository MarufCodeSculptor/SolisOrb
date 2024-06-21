import { createBrowserRouter } from 'react-router-dom';
import Root from '../Layouts/Root/Root';

const router = createBrowserRouter([
  {
    path: '/',
    element:<Root/> ,
    errorElement: <h3> page not found </h3>,
    children: [
      {
        path: '/',
        element: <h4> this is from home</h4>,
      },
    ],
  },
]);
export default router;
