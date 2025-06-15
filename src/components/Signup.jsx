import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', role: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    const { password, confirm, email } = form;
    if (!form.fullName || !email || !password || !confirm) return setError('All fields are required');
    if (password !== confirm) return setError('Passwords do not match');
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.email === email)) return setError('Email already registered');
    users.push(form);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('user', JSON.stringify(form));
    navigate('/dashboard');
  };

  return (
    <div className="container mt-5">
      <h2>Signup</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        {['fullName', 'email', 'phone', 'role', 'password', 'confirm'].map(name => (
          <div className="mb-3" key={name}>
            <label className="form-label">{name === 'confirm' ? 'Confirm Password' : name.replace(/([A-Z])/g, ' $1')}</label>
            <input
              name={name} type={name.includes('password') ? 'password' : 'text'}
              className="form-control"
              value={form[name]} onChange={handleChange}
            />
          </div>
        ))}
        <button className="btn btn-primary">Signup</button>
      </form>
      <p className="mt-3">Already registered? <Link to="/login">Login here</Link></p>
    </div>
  );
};

export default Signup;