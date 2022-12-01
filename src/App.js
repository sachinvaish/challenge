import CssBaseline from "@mui/material/CssBaseline";
import { Container } from '@mui/material';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home/index.js';
import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom';
import SubmissionView from "./pages/SubmissionView";



function App() {

  const theme = createTheme({
    typography: {
      fontFamily: [
        'Roboto', 'serif'
      ].join(','),
      fontWeight: 700
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
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/submission" element={<SubmissionView/>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
