import React, { useState } from 'react';

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
      <h2>COVID APP</h2>

      <div className="header-content">
        <div className="user-container">
          <p>{currentUser.email}</p>
        </div>

        <button type="button" onClick={handleLogout} className="btn-custom btn-logout">
          <i className="fas fa-sign-out-alt" />
        </button>
      </div>

      {error && (<p className="error">{`Error: ${error}`}</p>)}
    </header>
  );
};

export default Header;
