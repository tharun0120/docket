import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, isLoggedIn, clearState } from "../app/userSlice";
import MainContent from "../components/MainContent";
import Header from "../components/Header";

function HomePage() {
  const { isError } = useSelector(selectUser);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isLoggedIn());
  }, []); //eslint-disable-line

  useEffect(() => {
    if (isError) {
      dispatch(clearState());
      history.push("/login");
    }
  }, [isError]); //eslint-disable-line

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}>
      <Header />
      <MainContent />
    </section>
  );
}

export default HomePage;
