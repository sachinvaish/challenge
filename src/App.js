import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home/index.js';
import {
  Routes, Route, useNavigate
} from 'react-router-dom';
import SubmissionView from "./pages/SubmissionView";
import Footer from "./components/Footer";
import CurrentChallenge from "./pages/CurrentChallenge/index.js";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Profile from "./pages/Profile";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./redux/features/userSlice";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "@mui/material";
import SetPassword from "./pages/Profile/SetPassword";



function App() {
  const { isLoggedIn, error } = useSelector((state) => ({ ...state.UserReducer }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        theme="dark"
      />
      <Routes>
        <Route exact path="/" element={<Home />}>
          <Route path="/login" element={<Login open={true} />} />
          <Route path="/signup" element={<Signup open={true} />} />
        </Route>
        <Route exact path="/submission/:id" element={<SubmissionView />} />
        <Route exact path="/contest" element={<CurrentChallenge />} />
        <Route exact path="/profile/:username" element={<Profile />} />
        <Route exact path="/reset-password/:id" element={<SetPassword />} />
        <Route exact path="/*" element={<h3>404 Not Found</h3>} />
      </Routes>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
