import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaHome } from "react-icons/fa";
import { MdOutlineAccountCircle } from "react-icons/md";
import { AiFillFire } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import ReactTooltip from "react-tooltip";
import Modal from "react-modal";
import { IoCloseSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { selectUser } from "../app/userSlice";

const Header = ({ page }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { user } = useSelector(selectUser);
  return (
    <Container>
      <h1 style={{ fontFamily: "Roboto", fontWeight: "700", fontSize: "25px" }}>
        Docket.
      </h1>
      <ButtonPanel>
        <Link to="/" data-tip="Home">
          <FaHome />
        </Link>

        <div onClick={() => setModalOpen(true)}>
          <AiFillFire data-tip="streak" />
        </div>

        <Link to="/account" data-tip="Account">
          <MdOutlineAccountCircle />
        </Link>

        <Link to="/about" data-tip="About">
          <BsInfoCircle />
        </Link>
      </ButtonPanel>
      <ReactTooltip place="bottom" type="dark" />
      <Modal
        isOpen={modalOpen}
        style={modalStyles}
        appElement={document.getElementById("root") || undefined}>
        <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
          <div style={{ width: "100%" }}>
            <IoCloseSharp
              style={{ float: "right", cursor: "pointer", fontSize: "25px" }}
              onClick={() => setModalOpen(false)}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
              gap: "10px",
            }}>
            <AiFillFire style={{ fontSize: "80px", color: "#ff5a00" }} />
            <span style={{ fontSize: "25px", fontWeight: "800" }}>Streaks</span>

            <span style={{ fontSize: "20px" }}>
              You can increase your {}{" "}
              <span style={{ color: "rgb(0, 173, 181)", fontWeight: "bold" }}>
                streak
              </span>{" "}
              {} by completing dockets before the {}
              <span style={{ color: "orange", fontWeight: "600" }}>
                Deadline
              </span>
            </span>
            <span style={{ fontSize: "30px" }}>
              Your current Streak is {user?.streak}
            </span>
          </div>
          <button
            style={{
              padding: "10px",
              fontSize: "16px",
              color: "#eeeeee",
              backgroundColor: "rgb(34, 40, 49)",
              border: "none",
              cursor: "pointer",
              marginTop: "20px",
            }}
            onClick={() => setModalOpen(false)}>
            DISMISS
          </button>
        </div>
      </Modal>
    </Container>
  );
};

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

const Container = styled.div`
  background-color: rgb(34, 40, 49);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  width: 1152px;
  position: sticky;
  margin: 10px auto;
  border-radius: 20px;

  h1 {
    letter-spacing: 2px;
    padding-left: 36px;
  }
`;

const ButtonPanel = styled.div`
  padding-right: 36px;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    text-transform: uppercase;
    text-align: center;
    font-size: 35px;
    margin: 15px;
    letter-spacing: 2px;
    color: #eeeeee;
    border-radius: 3px;
    transition: all 250ms ease-in-out;
    cursor: pointer;
    border: none;
    padding: 5px;

    &:hover {
      color: rgb(0, 173, 181);
      border: none;
      outline: none;
    }

    &:focus {
      color: rgb(0, 173, 181);
      border: none;
      outline: none;
    }
  }
`;

export default Header;
