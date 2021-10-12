import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useAuth } from '../firebase/authContext';

import '../styles/Auth.css';

const Login = () => {
  const history = useHistory();
  const { loginUser } = useAuth();

  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      history.push('/');
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(''), 2000);
    }
  };

  return (
    <div className="card">
      <h1>Log In</h1>

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

        <button type="submit">Log In</button>
      </form>

      { error && (<p className="error">{`Error: ${error}`}</p>) }

      <p>
        {'Do not have an Account? '}
        <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
