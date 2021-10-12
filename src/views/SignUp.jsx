import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useAuth } from '../firebase/authContext';

import '../styles/Auth.css';

const SignUp = () => {
  const history = useHistory();
  const { createUser } = useAuth();

  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please try again');
      setTimeout(() => setError(''), 2000);
    } else {
      try {
        await createUser(email, password);
        history.push('/');
      } catch (err) {
        setError(err.message);
        setTimeout(() => setError(''), 2000);
      }
    }
  };

  return (
    <div className="card">
      <h1>Sign Up</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Retype password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button type="submit">Create Account</button>
      </form>

      { error && (<p className="error">{`Error: ${error}`}</p>) }

      <p>
        {'Have an account? '}
        <Link to="/login">Log In</Link>
      </p>
    </div>
  );
};

export default SignUp;
