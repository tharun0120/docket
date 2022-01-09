import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, isLoggedIn } from "../app/userSlice";
import MainContent from "../components/MainContent";
import Header from "../components/Header";

function HomePage() {
  const { user, isSuccess } = useSelector(selectUser);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch(isLoggedIn());
      if (!isSuccess) history.push("/login");
    }
  }, [user, isSuccess]); //eslint-disable-line

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
