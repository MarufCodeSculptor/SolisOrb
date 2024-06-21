import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './Router/Router';
import CredProvider from './Providers/AuthProvider/CredProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CredProvider>
      <RouterProvider router={router} />
    </CredProvider>
  </React.StrictMode>
);
