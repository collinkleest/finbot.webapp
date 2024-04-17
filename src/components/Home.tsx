import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import VanguardLogo from './vanguard-logo.png'; // Assuming you have the Vanguard logo image imported or placed in your project


export function Home() {
    return (
      <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <img src={VanguardLogo} alt="Vanguard Logo" style={{ width: 200, marginBottom: 16 }} />
        <Typography variant="h4" gutterBottom>
          Welcome to AI Fund Assistant
        </Typography>
        <Typography variant="body1" style={{ marginBottom: 16, textAlign: 'center' }}>
          Here to help you with financial data retrieval and answer any of your investment questions.
        </Typography>
        <Button
          variant="contained"
          color="error"
          component={Link}
          to="/login"
          style={{ marginTop: 16 }}
        >
          Start Chatting
        </Button>
      </Container>
    );
}
