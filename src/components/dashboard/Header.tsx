import React from 'react';
import '../../styles/dashboard/header.scss';
import { useAuth } from 'src/hooks/useAuth';

const searchInputStyle = {
  border: 'none',
  backgroundColor: 'var(--color-gray)',
  borderTopLeftRadius: '0rem',
  borderBottomLeftRadius: '0rem',
  width: '20rem',
  flex: 1,
  margin: 0
};

const Header = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <section className="header">
      <div className="header-name">
        <h1>Welcome back {user.name.split(' ')[0]}!</h1>
        <p>You are doing great, keep going</p>
      </div>
      <div className="right-section">
        <div className="search">
          <span>
            <img className="search-icon" src="/icons/search.png" alt="search" />
          </span>
          <input style={searchInputStyle} type="text" />
        </div>
        <div className="header-profile">
          <img src="/avatar2.jpg" alt="profile" className="header-avatar" />
          <div className="name">
            <h2>Omar Salah</h2>
            <p>omar.salah1597@gmail.com</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
