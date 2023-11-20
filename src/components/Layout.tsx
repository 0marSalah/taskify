import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';

import '../styles/globals.css';
import Header from './dashboard/Header';

const Layout = ({ children }: any) => {
  const location = useLocation();
  const showNavbar = !['/signin', '/signup'].includes(location.pathname);

  return (
    <div className="container">
      {showNavbar && <Navbar />}
      <div className="component">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default Layout;
