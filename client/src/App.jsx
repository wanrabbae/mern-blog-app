import { Navbar, Footer } from "./components";
import {
  Home,
  Posts,
  PostsWithCategory,
  Sign,
  Activation,
  Profile,
  EditProfile,
} from "./pages/index";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider, Box } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1D4ED8",
      dark: "#1D4ED8",
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
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Navbar />
        {element}
        <Footer />
      </Box>
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
            <Route
              path="/user/profile"
              element={<RouteWithNavbarAndFooter element={<Profile />} />}
            />
            <Route
              path="/user/edit-profile"
              element={<RouteWithNavbarAndFooter element={<EditProfile />} />}
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
