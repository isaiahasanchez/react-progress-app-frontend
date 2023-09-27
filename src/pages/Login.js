import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext'; // adjust the path

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // assume you have a login method in your context

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log('Attempting to login'); // Add this line
        await login(email, password);
        console.log('Login successful, navigating to homepage'); // Add this line
        navigate('/'); // navigate to the homepage or dashboard upon successful login
    } catch (err) {
        console.error(err); // log actual error to the console
        setError('Failed to log in');
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
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
