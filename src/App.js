import { Container, createTheme,ThemeProvider } from '@mui/material';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home/index.js';



function App() {

  const theme = createTheme({
    typography: {
      fontFamily: [
        'Nunito', 'serif'
      ].join(','),
    },
  });

  return (
    <ThemeProvider theme={theme}>
        <Navbar />
        <Home />
    </ThemeProvider>
  );
}

export default App;
