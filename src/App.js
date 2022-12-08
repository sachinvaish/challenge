import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home/index.js';
import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom';
import SubmissionView from "./pages/SubmissionView";
import Footer from "./components/Footer";
import CurrentChallenge from "./pages/CurrentChallenge.js";



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
        default: "#f2f2ed"
      },
      text: {
        primary: "#363636"
      }
    },
    components: {
      MuiChip: {
        styleOverrides: {
          deletableColorPrimary: {
            '&:hover': {
              backgroundColor: '#eb432d'
            }
          }
        }
      }
    }

  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/submission" element={<SubmissionView />} />
          <Route exact path="/contest" element={<CurrentChallenge />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
