import { useState } from 'react';
import { Container, Typography, TextField, Button, Paper, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {env} from '../environemnt'
import { useUserStore } from '../store';

function LoginPage() {
  const navigate = useNavigate();
  //@ts-ignore
  const setUser = useUserStore(state => state.setUser);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      // Call your API here to authenticate user
      // Replace this with your actual API call
      const response = await fetch(`${env.api_url}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // If login successful, navigate to /chat
        const userData = await response.json();
        setUser(userData);
        navigate('/chat');
      } else {
        // If login fails, display error message
        setError('Invalid email or password. Please try again.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('An error occurred while logging in. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Paper elevation={3} style={{ padding: '20px', background: '#f5f5f5', maxWidth: '300px' }}>
        <Typography variant="h4" gutterBottom style={{ color: '#000000' }}>
          Login
        </Typography>
        <form style={{ width: '100%' }} onSubmit={(e) => e.preventDefault()}>
          <TextField
            label="Email Address"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: '16px' }}
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
          {error && (
            <Typography variant="body2" color="error" style={{ marginTop: '8px' }}>
              {error}
            </Typography>
          )}
          <Typography variant="body2" style={{ marginTop: '16px', textAlign: 'center' }}>
            Don't have an account? <Link href="/register">Register here</Link>
          </Typography>
        </form>
      </Paper>
    </Container>
  );
}

export default LoginPage;
