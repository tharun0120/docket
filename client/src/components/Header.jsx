import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaHome } from "react-icons/fa";
import { MdOutlineAccountCircle } from "react-icons/md";
import { AiFillFire } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";

const Header = ({ streak, page }) => {
  return (
    <Container>
      <h1 style={{ fontFamily: "Roboto", fontWeight: "700", fontSize: "25px" }}>
        Docket.
      </h1>
      <ButtonPanel>
        <Link to="/">
          <FaHome />
        </Link>

        <div>
          <AiFillFire />
        </div>

        <Link to="/account">
          <MdOutlineAccountCircle />
        </Link>

        <Link to="/about">
          <BsInfoCircle />
        </Link>
      </ButtonPanel>
    </Container>
  );
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
