import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUser,
  updateUser,
  deleteUser,
  logout,
  clearState,
} from "../app/userSlice";
import { selectTasks } from "../app/taskSlice";

function Account() {
  const [newPassword, setNewPassword] = useState();
  const { user, isSuccess } = useSelector(selectUser);
  const { tasks } = useSelector(selectTasks);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      history.push("/login");
    }
  });

  const getLength = () => {
    const keys = Object.keys(tasks);
    let count = 0;
    keys.forEach((date) => {
      count += tasks[date].length;
    });
    return count;
  };

  const logoutUser = () => {
    dispatch(logout());
    if (isSuccess) {
      dispatch(clearState());
      toast.success("Logged Out Successfully");
      history.push("/login");
    }
  };
  const changePassword = () => {
    dispatch(updateUser(newPassword));
    if (isSuccess) {
      toast.success("Password Changed Successfully");
      history.push("/login");
      localStorage.removeItem("token");
    }
  };
  const deleteAccount = () => {
    dispatch(deleteUser());
    if (isSuccess) {
      dispatch(clearState());
      toast.success("Account Deleted Successfully");
      history.push("/login");
    }
  };
  return (
    <Container>
      <Panel>
        <div
          style={{
            width: "300px",
            height: "300px",
            backgroundColor: "white",
            borderRadius: "50%",
          }}></div>
        <div>
          <Wrap>
            <label htmlFor="displayName">Name</label>
            <span htmlFor="displayName">{user?.displayName}</span>
            {/* <div style={{ width: "18rem", display: "flex" }}>
              <input type="text" />
              <FaEdit style={{ fontSize: "16px" }} />
            </div> */}
          </Wrap>
          <Wrap>
            <label htmlFor="email">Email</label>
            <span htmlFor="email">{user?.email}</span>
            {/* <input type="text" /> */}
          </Wrap>
          <Wrap>
            <label htmlFor="streak">Streak</label>
            <span htmlFor="streak">{user?.streak}</span>
            {/* <input type="text" /> */}
          </Wrap>
          <Wrap>
            <label htmlFor="dockets">Total Dockets</label>
            <span htmlFor="">{getLength()}</span>
            {/* <input type="text" /> */}
          </Wrap>
        </div>
      </Panel>
      <ButtonPanel>
        <div>
          <button
            style={{ backgroundColor: "red" }}
            onClick={() => deleteAccount()}>
            Delete Account
          </button>
          <button
            style={{ backgroundColor: "green" }}
            onClick={() => changePassword()}>
            Change Password
          </button>
        </div>
        <button
          style={{ backgroundColor: "orange" }}
          onClick={() => logoutUser()}>
          Log Out
        </button>
      </ButtonPanel>
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 1152px;
  height: 35rem;
  background-color: rgb(57, 62, 70);
  border-radius: 15px;
  font-family: "Roboto";
  color: white;
`;

const Panel = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const Wrap = styled.div`
  display: grid;
  gap: 0;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: center;
  justify-items: start;
  padding: 20px;
  margin-left: 100px;
  padding-bottom: 15px;
  font-size: 25px;
  text-align: center;
  text-transform: uppercase;

  /* input {
    min-width: 18rem;
    height: 37px;
    padding: 10px;
    font-size: 18px;
    background-color: white;
    border: 0px;
    border-radius: 4px;
    transition: all 250ms ease-in-out;

    &:focus {
      outline: none;
      /* box-shadow: 0px 0px 12px 0.8px #0281ce96; 
    } 
  }*/
`;

const ButtonPanel = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  button {
    margin: 10px;
    font-size: 20px;
    padding: 15px;
    border: 0;
    color: #eeeeee;
    border-radius: 6px;
    text-transform: uppercase;
    font-weight: 600;
    cursor: pointer;
  }
`;

export default Account;
