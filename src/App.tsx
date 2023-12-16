import './styles/globals.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthForm from './components/forms/AuthForm';
import { AuthProvider, ProtectRoute } from './hooks/useAuth';
import Layout from './components/Layout';
import Dashboard from './components/dashboard/Dashboard';
import ProjectsPage from './components/projects/ProjectsPage';
import Project from './components/projects/Project';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { hover } from '@testing-library/user-event/dist/hover';

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
          <ProjectsPage />
        </ProtectRoute>
      </Layout>
    )
  },
  {
    path: '/projects/:id',
    element: (
      <Layout>
        <ProtectRoute>
          <Project />
        </ProtectRoute>
      </Layout>
    )
  },
  {
    path: '/calender',
    element: (
      <Layout>
        <Helmet>
          <title>Calender</title>
          <meta name="description" content="Calender" />
        </Helmet>
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
        <Helmet>
          <title>Reports</title>
          <meta name="description" content="Reports" />
        </Helmet>
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
        <Helmet>
          <title>Settings</title>
          <meta name="description" content="Settings" />
        </Helmet>
        <ProtectRoute>
          <div>settings</div>
        </ProtectRoute>
      </Layout>
    )
  },
  {
    path: '*',
    element: (
      <>
        <Helmet>
          <title>Not Found</title>
          <meta name="description" content="Not Found" />
        </Helmet>
        <h1>
          404 <br /> Not Found
        </h1>
        <div
          style={{
            marginTop: '2rem',
            textAlign: 'center',
            textDecoration: 'underline',
            fontSize: '1.5rem'
          }}
        >
          <Link to="/">Go back to home</Link>
        </div>
      </>
    )
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
