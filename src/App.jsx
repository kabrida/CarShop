import CarList from './components/CarList';
import './App.css';
import Container from '@mui/material/Container';
import { Toolbar, Typography, AppBar } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {

  return (
    <>
    <Container maxWidth="xl">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Car Shop
          </Typography>
        </Toolbar>
      </AppBar>
      <CarList />
      </Container>
    </>
  )
}

export default App
