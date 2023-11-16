import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import { AuthProvider, ProtectRoute } from './hooks/useAuth';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectRoute>
        <App />
      </ProtectRoute>
    )
  },
  {
    path: '/signup',
    element: <AuthForm form="signup" />
  },
  {
    path: '/signin',
    element: <AuthForm form="signin" />
  },
  {
    path: '*',
    element: <div>Not Found</div>
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <div className="layout">
      <div className="wrapper">
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </div>
    </div>
  </React.StrictMode>
);
