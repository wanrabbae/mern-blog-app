import { Navbar, Footer } from "./components";
import { Home, Posts, PostsWithCategory, Sign } from "./pages/index";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@mui/material";

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
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
