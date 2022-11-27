import CssBaseline from "@mui/material/CssBaseline";
import { Container} from '@mui/material';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home/index.js';



function App() {

  const theme = createTheme({
    typography: {
      fontFamily: [
        'Roboto', 'serif'
      ].join(','),
      fontWeight:700
    },
    palette: {
      background: {
        default: "#222222"
      },
      text: {
        primary: "#ffffff"
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
        <Navbar />
        <Home />
    </ThemeProvider>
  );
}

export default App;
