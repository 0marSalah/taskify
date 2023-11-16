import React from 'react';
import './styles/globals.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="app">
      <div className="">
        <header className="app-header">Header</header>
        <Link to="/signup">Signup</Link>
      </div>
    </div>
  );
}

export default App;
