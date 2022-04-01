import { Navbar, Footer } from "./components/";
import { MainPage, PostsCategory } from "./pages/index";
// import { Route, BrowserRouter, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App flex flex-col h-screen justify-between dark:bg-gray-800">
      <Navbar />
      <MainPage />
      {/* <PostsCategory /> */}
      <Footer />
    </div>
  );
}

export default App;
