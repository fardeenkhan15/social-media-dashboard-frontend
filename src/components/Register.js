import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register } from '../api/api';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(username, email, password, fullName, dateOfBirth); // Pass parameters separately
      toast.success('Registration successful');
      navigate('/login');
    } catch (error) {
      toast.error('Registration failed');
      console.error('Registration failed:', error);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Date of Birth"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />
        <Box mt={3} mb={2}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Register
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default Register;
