import React from 'react';
import './styles/globals.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import { AuthProvider, ProtectRoute } from './hooks/useAuth';
import Layout from './components/Layout';
import Dashboard from './components/dashboard/Dashboard';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <ProtectRoute>
          <Dashboard />
        </ProtectRoute>
      </Layout>
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
    path: '/projects',
    element: (
      <Layout>
        <ProtectRoute>
          <div>projects</div>
        </ProtectRoute>
      </Layout>
    )
  },
  {
    path: '/calender',
    element: (
      <Layout>
        <ProtectRoute>
          <div>calender</div>
        </ProtectRoute>
      </Layout>
    )
  },
  {
    path: '/reports',
    element: (
      <Layout>
        <ProtectRoute>
          <div>reports</div>
        </ProtectRoute>
      </Layout>
    )
  },
  {
    path: '/settings',
    element: (
      <Layout>
        <ProtectRoute>
          <div>settings</div>
        </ProtectRoute>
      </Layout>
    )
  },
  {
    path: '*',
    element: <div>Not Found</div>
  }
]);

function App() {
  return (
    <div className="layout">
      <div className="wrapper">
        <div className="app">
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </div>
      </div>
    </div>
  );
}

export default App;
