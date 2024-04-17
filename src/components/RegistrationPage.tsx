import { useState } from 'react';
import { Container, Typography, TextField, Button, Paper, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { env } from '../environemnt'

function RegistrationPage() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    try {
      setIsLoading(true);
      // Call your API here to register user
      // Replace this with your actual API call
      const response = await fetch(`${env.api_url}/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      if (response.ok) {
        // If registration successful, navigate to /login
        navigate('/login');
      } else {
        // If registration fails, display error message
        setError('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error registering:', error);
      setError('An error occurred while registering. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Paper elevation={3} style={{ padding: '20px', background: '#f5f5f5', maxWidth: '300px' }}>
        <Typography variant="h4" gutterBottom style={{ color: '#000000' }}>
          Register
        </Typography>
        <form style={{ width: '100%' }} onSubmit={(e) => e.preventDefault()}>
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
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
            onClick={handleRegister}
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </Button>
          {error && (
            <Typography variant="body2" color="error" style={{ marginTop: '8px' }}>
              {error}
            </Typography>
          )}
          <Typography variant="body2" style={{ marginTop: '16px', textAlign: 'center' }}>
            Already have an account? <Link href="/login">Login here</Link>
          </Typography>
        </form>
      </Paper>
    </Container>
  );
}

export default RegistrationPage;
