import { useState, useEffect } from "react";
import { selectUser, isLoggedIn, clearState } from "../app/userSlice";
import { useSelector, useDispatch } from "react-redux";

function useLoggedIn() {
  const { isSuccess } = useSelector(selectUser);
  const dispatch = useDispatch();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    dispatch(isLoggedIn());
    if (isSuccess) setLoggedIn(true);
  }, [isSuccess]); //eslint-disable-line

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []); //eslint-disable-line

  return loggedIn;
}

export default useLoggedIn;
