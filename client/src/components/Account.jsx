import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import { FaEdit } from "react-icons/fa";
import axios from "axios";
import { BsUpload } from "react-icons/bs";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUser,
  updateUser,
  deleteUser,
  logout,
  clearState,
  isLoggedIn,
} from "../app/userSlice";
import { selectTasks } from "../app/taskSlice";

function Account() {
  const [password, setPassword] = useState("");
  const [passwordRetype, setPasswordRetype] = useState("");
  const [image, setImage] = useState();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [changePasswordModalOpen, setChangePasswordModalOpen] = useState(false);
  const { user, isSuccess, isError } = useSelector(selectUser);
  const { tasks } = useSelector(selectTasks);
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

  useEffect(() => {
    async function getAvatar() {
      if (user)
        fetch(`/api/users/${user?._id}/avatar`).then((data) => {
          if (data.status === 200)
            data.blob().then((img) => {
              const urlCreator = window.URL || window.webkitURL;
              setImage(urlCreator.createObjectURL(img));
            });
          else {
            setImage(null);
          }
        });
    }
    getAvatar();
  }); //eslint-disable-line

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
  const changePassword = (e) => {
    e.preventDefault();
    if (password.length < 7) {
      toast.warn("Password should be more than 7 characters");
      return;
    }
    if (password !== passwordRetype) {
      toast.warn("Password does not match");
      return;
    }
    dispatch(
      updateUser({
        password: password,
      })
    );
    if (isSuccess) {
      toast.success("Password Changed Successfully");
      logoutUser();
      history.push("/login");
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
  const uploadImage = (e) => {
    const formData = new FormData();
    formData.append("avatar", e.target.files[0]);
    let image;
    axios
      .post("/api/users/me/avatar", formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((data) => {
        image = data.data.avatar;
        toast.success(data.data.message);
      });
    setImage(image);
  };

  const deleteAvatar = () => {
    axios
      .delete("/api/users/me/avatar", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((data) => {
        setImage(null);
        toast.success(data.data.message);
      });
  };

  return (
    <Container>
      <Panel>
        <div>
          {image ? (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <img
                src={image}
                alt="avatar"
                style={{
                  width: "300px",
                  height: "300px",
                  objectFit: "contain",
                  borderRadius: "50%",
                }}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "25px",
                }}>
                <button
                  style={{
                    margin: "0",
                    fontSize: "16px",
                    borderRadius: "5px",
                    padding: "10px",
                    color: "#eeeeee",
                    backgroundColor: "black",
                    border: "none",
                    textTransform: "uppercase",
                    cursor: "pointer",
                  }}
                  onClick={() => deleteAvatar()}>
                  Delete
                </button>
                <button
                  style={{
                    margin: "0",
                    fontSize: "16px",
                    borderRadius: "5px",
                    padding: "10px",
                    color: "#eeeeee",
                    backgroundColor: "black",
                    border: "none",
                    textTransform: "uppercase",
                    cursor: "pointer",
                  }}>
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={(e) => uploadImage(e)}
                    multiple={false}
                    style={{ display: "none" }}
                  />
                  <label
                    htmlFor="image"
                    style={{
                      width: "100%",
                      height: "100%",
                      cursor: "pointer",
                    }}>
                    Change
                  </label>
                </button>
              </div>
            </div>
          ) : (
            <button
              style={{
                width: "300px",
                height: "300px",
                backgroundColor: "rgba(255,255,255,0.8)",
                objectFit: "contain",
                borderRadius: "50%",
              }}>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={(e) => uploadImage(e)}
                multiple={false}
                style={{ display: "none" }}
              />
              <label
                htmlFor="image"
                style={{
                  fontSize: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: "10px",
                  width: "100%",
                  height: "100%",
                }}>
                Click here to upload an image
                <BsUpload style={{ fontSize: "40px" }} />
              </label>
            </button>
          )}
        </div>
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
            onClick={() => setDeleteModalOpen(true)}>
            Delete Account
          </button>
          <button
            style={{ backgroundColor: "green" }}
            onClick={() => setChangePasswordModalOpen(true)}>
            Change Password
          </button>
        </div>
        <button
          style={{ backgroundColor: "orange" }}
          onClick={() => logoutUser()}>
          Log Out
        </button>
      </ButtonPanel>
      <Modal
        isOpen={deleteModalOpen}
        style={modalStyles}
        appElement={document.getElementById("root") || undefined}>
        <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
          <span style={{ fontSize: "25px" }}>
            Do you want to permanently delete your account?
          </span>
          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "end",
              alignItems: "center",
            }}>
            <button
              style={{
                margin: "0",
                fontSize: "20px",
                borderRadius: "5px",
                padding: "10px",
                color: "#eeeeee",
                backgroundColor: "black",
                border: "none",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
              onClick={() => deleteAccount()}>
              Yes
            </button>
            <button
              style={{
                margin: "0",
                fontSize: "20px",
                borderRadius: "5px",
                padding: "10px",
                color: "#eeeeee",
                backgroundColor: "black",
                border: "none",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
              onClick={() => setDeleteModalOpen(false)}>
              No
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={changePasswordModalOpen}
        style={modalStyles}
        appElement={document.getElementById("root") || undefined}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
            gap: "20px",
          }}>
          <h2 style={{ fontSize: "20px" }}>Change Your Password</h2>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              fontSize: "16px",
            }}>
            <label>New Password</label>
            <input
              type="password"
              style={{ padding: "10px" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              fontSize: "16px",
            }}>
            <label>Confirm New Password</label>
            <input
              type="password"
              style={{ padding: "10px" }}
              value={passwordRetype}
              onChange={(e) => setPasswordRetype(e.target.value)}
            />
          </div>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              paddingTop: "20px",
            }}>
            <button
              style={{
                margin: "0",
                fontSize: "15px",
                borderRadius: "5px",
                padding: "10px",
                color: "#eeeeee",
                backgroundColor: "black",
                border: "none",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
              onClick={() => setChangePasswordModalOpen(false)}>
              Close
            </button>
            <button
              style={{
                margin: "0",
                fontSize: "15px",
                borderRadius: "5px",
                padding: "10px",
                color: "#eeeeee",
                backgroundColor: "black",
                border: "none",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
              onClick={(e) => changePassword(e)}>
              Confirm
            </button>
          </div>
        </div>
      </Modal>
    </Container>
  );
}

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

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
  gap: 60px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: center;
  justify-items: start;
  padding: 20px;
  margin-left: 100px;
  padding-bottom: 15px;
  font-size: 25px;
  text-align: center;

  label {
    text-transform: uppercase;
  }

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
