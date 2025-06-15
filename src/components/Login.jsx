import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return setError('Invalid credentials');
    localStorage.setItem('user', JSON.stringify(user));
    navigate('/dashboard');
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        {['email', 'password'].map(name => (
          <div className="mb-3" key={name}>
            <label className="form-label">{name.charAt(0).toUpperCase() + name.slice(1)}</label>
            <input
              name={name} type={name}
              className="form-control"
              value={name === 'email' ? email : password}
              onChange={e => name === 'email' ? setEmail(e.target.value) : setPassword(e.target.value)}
            />
          </div>
        ))}
        <button className="btn btn-primary">Login</button>
      </form>
      <p className="mt-3">New here? <Link to="/signup">Signup here</Link></p>
    </div>
  );
};

export default Login;