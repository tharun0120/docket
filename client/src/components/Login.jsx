import { useEffect, useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser, clearState, isLoggedIn } from "../app/userSlice";
import Loader from "./Loader";
import loginImg from "./images/login.svg";
import homeBackground from "./images/homeBackground.svg";

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isError, isFetching, isSuccess, error } = useSelector(selectUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    dispatch(isLoggedIn());
  }, []); //eslint-disable-line

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []); //eslint-disable-line

  useEffect(() => {
    if (isSuccess) {
      if (localStorage.getItem("token"))
        toast.success("Logged in Successfully");
      history.push("/");
    }
    if (isError) {
      if (error) toast.error(error.message);
      dispatch(clearState());
    }
  }, [isSuccess, isError]); //eslint-disable-line

  const setUser = () => {
    const user = {
      email,
      password,
    };
    dispatch(login(user));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      toast.warn("Please enter an email");
      return;
    }

    if (!password) {
      toast.warn("Please enter a password");
      return;
    }

    setUser();
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
            <span style={{ fontWeight: "600" }}>Login</span>
            <img src={loginImg} alt="login.svg" />
            <Content>
              <Wrap>
                <label htmlFor="email">Email</label>
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
                <label htmlFor="password">Password</label>
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
              <input type="submit" value="Login" onClick={onSubmit} />
            </SubmitButton>
            <Footer>
              <label htmlFor="register-link">
                Don't have an Account?
                <Link to="/register">
                  <p>Register</p>
                </Link>
              </label>
            </Footer>
          </Form>
        </Container>
      </LoginBox>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  margin: 0%;
  text-align: center;
  background: url(${homeBackground});
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginBox = styled.div`
  width: 27em;
  height: 40em;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5ex;
  position: relative;
  z-index: 99;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  box-shadow: 0px 0px 12px 2px rgba(15, 15, 15, 0.3);
  border-radius: 4px;
  position: relative;
  z-index: 99;
  width: 100%;
  height: 100%;
  z-index: 99;
  font-family: "Montserrat", sans-serif;
  padding: 17px 10px;
  transition: transform 200ms ease-in-out;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: fit-content;

  label {
    font-size: 20px;
  }

  input {
    margin-top: 6px;
    min-width: 18rem;
    height: 37px;
    padding: 0px 10px;
    font-size: 16px;
    background-color: #f3f3f3;
    border: 0px;
    border-radius: 4px;
    margin-bottom: 31px;
    transition: all 250ms ease-in-out;
  }

  input:focus {
    outline: none;
    box-shadow: 0px 0px 12px 0.8px #00c2cc;
  }
`;

const SubmitButton = styled.div`
  input {
    font-size: 21px;
    padding: 5px 20px;
    border: 0;
    background-color: #00adb5;
    color: #fff;
    border-radius: 3px;
    transition: all 250ms ease-in-out;
    cursor: pointer;
  }

  input:hover {
    background-color: #00adb5;
  }

  input:focus {
    outline: none;
  }
`;

const Content = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    font-size: 28px;
  }

  img {
    width: 21rem;
    height: 100%;
    object-fit: cover;
  }
`;

const Footer = styled.div`
  margin-top: 0.8rem;
  p {
    font-size: 18px;
    text-decoration: none;
  }
`;

export {
  LoginContainer,
  LoginBox,
  Container,
  Content,
  Wrap,
  SubmitButton,
  Footer,
  Form,
};

export default Login;
