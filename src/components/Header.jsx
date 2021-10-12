import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { useAuth } from '../firebase/authContext';

import '../styles/Header.css';

const Header = () => {
  const { currentUser, logOutUser } = useAuth();
  const [error, setError] = useState('');

  const handleLogout = async () => {
    try {
      await logOutUser();
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(''), 2000);
    }
  };

  return (
    <header>
      <div>
        Aqui el logo
      </div>

      <nav>
        <NavLink to="/login"> Log In </NavLink>
        <NavLink to="/signup"> Sign Up</NavLink>
      </nav>

      <div className="header-content">
        <div className="user-container">
          <p>{currentUser.email}</p>
        </div>

        <button type="button" onClick={handleLogout} className="btn-logout">
          <i className="fas fa-sign-out-alt" />
        </button>
      </div>

      {error && (<p className="error">{`Error: ${error}`}</p>)}
    </header>
  );
};

export default Header;
