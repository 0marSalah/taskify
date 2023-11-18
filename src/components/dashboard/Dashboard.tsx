import React from 'react';
import Header from './Header';
import '../../styles/dashboard/dashboard.scss';
import Projects from './Projects';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Header />
      <div className="middle">
        <Projects />
      </div>
    </div>
  );
};

export default Dashboard;
