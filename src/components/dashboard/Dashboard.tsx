import React from 'react';
import '../../styles/dashboard/dashboard.scss';
import Projects from './Projects';
import { Helmet } from 'react-helmet-async';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Helmet>
        <title>Dashboard</title>
        <meta
          name="description"
          content="Dashboard  | Manage projects and know the performance and more"
        />
      </Helmet>
      <div className="middle">
        <Projects />
      </div>
    </div>
  );
};

export default Dashboard;
