import React from 'react';
import data from '../data/navbar.json';
import { Link, useLocation } from 'react-router-dom';

import '../styles/navbar.scss';
import Signout from './Signout';
import { AuthContext } from '../hooks/useAuth';

const Navbar = () => {
  const location = useLocation();
  const { user } = React.useContext(AuthContext);
  console.log(user);

  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <img src={'/logo.png'} alt="taskify" />
          <h1>TASKIFY</h1>
        </div>
        <ul className="navbar-list">
          {data.list.map((item, index) => (
            <li
              key={index}
              className={`${
                location.pathname === item.url
                  ? 'navbar-list-item active'
                  : 'navbar-list-item'
              }`}
            >
              <Link to={item.url}>
                <img src={item.icon} alt="icon" className="navbar-icon" />
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
          <Signout />
        </ul>
        <div className="profile">
          <img src="/avatar2.jpg" alt="profile" className="avatar" />
          <Link
            to="/profile"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: '1rem'
            }}
          >
            <h2>{user?.name}</h2>
            <p
              style={{
                color: 'var(--color-gray)',
                fontSize: '0.9rem',
                marginTop: '0.3rem'
              }}
            >
              Visit Profile
            </p>
            <img
              src="/icons/arrow-right.png"
              alt="arrow-right"
              className="profile-arrow"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
