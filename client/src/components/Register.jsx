import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import {
  LoginContainer,
  LoginBox,
  Container,
  Content,
  Wrap,
  SubmitButton,
  Footer,
  Form,
} from "./Login";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, register, clearState, isLoggedIn } from "../app/userSlice";
import Loader from "./Loader";
import loginImg from "./images/login.svg";

const Register = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user, isError, isSuccess, isFetching, error } =
    useSelector(selectUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    if (user) history.push("/");
  }, [user]); //eslint-disable-line

  useEffect(() => {
    if (!user) {
      dispatch(isLoggedIn());
      if (!isSuccess) history.push("/login");
    }
  }, [user]); //eslint-disable-line

  useEffect(() => {
    if (isSuccess) {
      history.push("/");
    }
    if (isError) {
      console.log(error);
      error.errors.map((error) => {
        return toast.error(error);
      });
      dispatch(clearState());
    }
  }, [isSuccess, isError]); //eslint-disable-line

  const setUser = () => {
    const user = {
      displayName,
      email,
      password,
    };
    dispatch(register(user));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!displayName) {
      toast.warn("Please enter a user name");
      return;
    }

    if (!email) {
      toast.warn("Please enter an email");
      return;
    }

    if (!password) {
      toast.warn("Please enter a password");
      return;
    }

    setUser();
    setDisplayName("");
    setEmail("");
    setPassword("");
  };

  return isFetching ? (
    <Loader />
  ) : (
    <LoginContainer>
      <LoginBox>
        <Container>
          <Form>
            <span style={{ fontWeight: "600" }}>Register</span>
            <img src={loginImg} alt="login.svg" />
            <Content>
              <Wrap>
                <label htmlFor="username">USERNAME</label>
                <input
                  name="username"
                  type="text"
                  placeholder="Name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
                />
              </Wrap>
              <Wrap>
                <label htmlFor="email">EMAIL</label>
                <input
                  name="email"
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Wrap>
              <Wrap>
                <label htmlFor="password">PASSWORD</label>
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Wrap>
            </Content>
            <SubmitButton>
              <input type="submit" value="Register" onClick={onSubmit} />
            </SubmitButton>
            <Footer>
              <label htmlFor="register-link">
                Already have an Account?
                <Link to="/login">
                  <p>Login</p>
                </Link>
              </label>
            </Footer>
          </Form>
        </Container>
      </LoginBox>
    </LoginContainer>
  );
};

export default Register;
