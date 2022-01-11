import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AccountPage from "./pages/AccountPage";
import HomePage from "./pages/HomePage";
import Page404 from "./pages/404Page";
import AboutPage from "./pages/AboutPage";
import PrivateRoute from "./helpers/PrivateRoute";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/register">
          <RegisterPage />
        </Route>
        <Route path="/about">
          <AboutPage />
        </Route>
        <PrivateRoute exact component={HomePage} path="/" />
        <PrivateRoute exact component={AccountPage} path="/account" />
        {/* <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/account">
          <AccountPage />
        </Route> */}
        <Route path="/*">
          <Page404 />
        </Route>
      </Switch>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );
}

export default App;
