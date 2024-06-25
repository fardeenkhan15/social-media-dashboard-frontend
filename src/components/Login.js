// import React, { useState } from 'react';
// import { TextField, Button, Typography, Container } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { login } from '../api';

// const Login = ({ setToken, setUsername }) => {
//   const [loginInput, setLoginInput] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await login(loginInput, password);
//       localStorage.setItem('token', response.data.token);
//       setToken(response.data.token);
//       setUsername(response.data.username);
//       toast.success('Login successful');
//       navigate('/dashboard');
//     } catch (error) {
//       toast.error('Login failed');
//       console.error('Login failed:', error);
//     }
//   };

//   return (
//     <Container maxWidth="xs" style={{ marginTop: '80px' }}>
//       <Typography variant="h4" align="center" gutterBottom>
//         Login
//       </Typography>
//       <form onSubmit={handleSubmit}>
//         <TextField
//           variant="outlined"
//           margin="normal"
//           required
//           fullWidth
//           label="Username or Email"
//           value={loginInput}
//           onChange={(e) => setLoginInput(e.target.value)}
//         />
//         <TextField
//           variant="outlined"
//           margin="normal"
//           required
//           fullWidth
//           label="Password"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <Button
//           type="submit"
//           fullWidth
//           variant="contained"
//           color="primary"
//         >
//           Login
//         </Button>
//       </form>
//     </Container>
//   );
// };

// export default Login;
import React, { useState } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login } from '../api/api';

const Login = ({ setToken, setUsername }) => {
  const [loginInput, setLoginInput] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(loginInput, password);
      localStorage.setItem('token', response.data.token);
      setToken(response.data.token);
      setUsername(response.data.username);
      toast.success('Login successful');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Login failed');
      console.error('Login failed:', error);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Username or Email"
          value={loginInput}
          onChange={(e) => setLoginInput(e.target.value)}
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
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;
