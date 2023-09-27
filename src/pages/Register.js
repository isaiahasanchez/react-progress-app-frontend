import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext'; // adjust the path

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { register } = useAuth(); // assume you have a register method in your context

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(email, password);
      navigate('/login'); // navigate to login page or other page upon successful registration
    } catch (err) {
        console.error(err); // log the actual error to the console
        setError(err.message || 'Failed to create an account'); // display the actual error message
      }
      
  }

  return (
    // Your Form Here
    <form onSubmit={handleSubmit}>
      {/* Display Error */}
      {error && <p>{error}</p>}
      {/* Email Input */}
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      {/* Password Input */}
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      {/* Submit Button */}
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
