import { Navbar, Footer } from "./components";
import {
  Home,
  Posts,
  PostsWithCategory,
  Sign,
  Activation,
} from "./pages/index";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1D4ED8",
      dark: "#1D4ED8",
    },
    secondary: {
      main: "#fefefe",
    },
  },
  typography: {
    fontFamily: "Poppins",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

const RouteWithNavbarAndFooter = ({ element }) => {
  return (
    <>
      <Navbar />
      {element}
      <Footer />
    </>
  );
};

// THEME COLOR #1D4ED8
function App() {
  return (
    <div className="App">
      <ToastContainer
        autoClose={3000}
        closeOnClick
        draggable
        position="top-right"
      />
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route
              path="/"
              element={<RouteWithNavbarAndFooter element={<Home />} />}
            />
            <Route
              path="/posts"
              element={<RouteWithNavbarAndFooter element={<Posts />} />}
            />
            <Route
              path="/posts/:category"
              element={
                <RouteWithNavbarAndFooter element={<PostsWithCategory />} />
              }
            />
            <Route path="/auth" element={<Sign />} />
            <Route path="/user/activate" element={<Activation />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
