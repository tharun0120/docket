import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./helpers/PrivateRoute";
import Loadable from "react-loadable";
import Loader from "./components/Loader";
// import LoginPage from "./pages/LoginPage";
// import RegisterPage from "./pages/RegisterPage";
// import AccountPage from "./pages/AccountPage";
// import HomePage from "./pages/HomePage";
// import Page404 from "./pages/404Page";
// import AboutPage from "./pages/AboutPage";

const HomePage = Loadable({
  loader: () => import("./pages/HomePage"),
  loading: Loader,
});

const LoginPage = Loadable({
  loader: () => import("./pages/LoginPage"),
  loading: Loader,
});

const RegisterPage = Loadable({
  loader: () => import("./pages/RegisterPage"),
  loading: Loader,
});

const AccountPage = Loadable({
  loader: () => import("./pages/AccountPage"),
  loading: Loader,
});

const Page404 = Loadable({
  loader: () => import("./pages/404Page"),
  loading: Loader,
});

const AboutPage = Loadable({
  loader: () => import("./pages/AboutPage"),
  loading: Loader,
});

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
