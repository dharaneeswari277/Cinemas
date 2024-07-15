import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const DEFAULT_EMAIL = 'admin@example.com'; 
  const DEFAULT_PASSWORD = 'admin123'; 

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Check if the input matches the default credentials
    if (email === DEFAULT_EMAIL && password === DEFAULT_PASSWORD) {
      navigate('/manage'); // Redirect to manage page
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email:
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          /></label>
        </div>
        <div>
          <label htmlFor="password">Password: 
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          /></label>
        </div>
        <button type="submit">Login</button>
      </form>
      <br/>
      <span>
        New user? Register Here
      </span>
    </div>
  );
};

export default Login;
