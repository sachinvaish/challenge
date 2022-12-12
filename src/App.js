import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home/index.js';
import {
  Routes, Route
} from 'react-router-dom';
import SubmissionView from "./pages/SubmissionView";
import Footer from "./components/Footer";
import CurrentChallenge from "./pages/CurrentChallenge/index.js";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Profile from "./pages/Profile";

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
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />}>
            <Route path="/login" element={<Login open={true} />} />
            <Route path="/signup" element={<Signup open={true} />} />
          </Route>
          <Route exact path="/submission" element={<SubmissionView />} />
          <Route exact path="/contest" element={<CurrentChallenge />} />
          <Route exact path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
    </ThemeProvider>
  );
}

export default App;
