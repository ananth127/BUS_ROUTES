// frontend/src/components/SignupForm.js
import React, { useState } from 'react';
import axios from 'axios';

const SignupForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [busId, setBusId] = useState('');
  const [role, setRole] = useState('student'); // Default role
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', { username, password, role , busId });
      alert(response.data.message); // Show success message
    } catch (error) {
        setMessage(error.response?.data?.message || 'Error registering user');
      alert(error.response?.data?.message || 'Error registering user');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <p>{message}</p>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input type='number' placeholder='Bus ID' value={busId} onChange={(e) => setBusId(e.target.value)} />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="student">Student</option>
        <option value="driver">Driver</option>
      </select>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupForm;
