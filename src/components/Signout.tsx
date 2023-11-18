import React from 'react';
import { removeAuthCookie } from 'src/utilities/cookie';
import '../styles/navbar.scss';
import '../styles/alert.scss';

const Signout = () => {
  const [show, setShow] = React.useState(false);

  const handleApproved = () => {
    removeAuthCookie();
    window.location.href = '/signin';
    setShow(false);
  };

  return (
    <>
      <li
        className="signout-item"
        style={{}}
        onClick={() => {
          setShow(true);
        }}
      >
        <img src="/icons/signout.png" alt="signout" className="navbar-icon" />
        <span>Sign out</span>
      </li>
      {show && (
        <div className="alert">
          <div className="alert-container">
            <div className="alert-icon">
              <img src="/icons/alert.png" alt="alert" />
            </div>
            <div className="alert-content">
              <h2>Are you sure?</h2>
              <p>Do you really want to sign out?</p>
            </div>
            <div className="alert-action">
              <button className="btn btn-primary" onClick={handleApproved}>
                Yes
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setShow(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Signout;
