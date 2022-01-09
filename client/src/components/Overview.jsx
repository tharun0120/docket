import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectUser } from "../app/userSlice";
import { selectTasks } from "../app/taskSlice";
import { FcHighPriority } from "react-icons/fc";
import { MdOutlineDoneOutline } from "react-icons/md";
import { CgDanger, CgStack } from "react-icons/cg";
import { AiOutlineFire } from "react-icons/ai";

function Overview() {
  const { user } = useSelector(selectUser);
  const { tasks } = useSelector(selectTasks);

  const getLength = () => {
    const keys = Object.keys(tasks);
    let count = 0;
    keys.map((date) => {
      count += tasks[date].length;
    });
    return count;
  };

  return (
    <Container>
      <h2 style={{ color: "white", fontSize: "2.5rem", textAlign: "center" }}>
        Hello{" "}
        <span style={{ color: "rgb(0, 173, 181)" }}>{user?.displayName}</span>!
      </h2>
      <Content>
        <Wrap>
          <AiOutlineFire style={{ color: "firebrick" }} />
          <label>Streak </label>
          <span>{user?.streak}</span>
        </Wrap>
        <Wrap>
          <CgStack style={{ color: "gold" }} />
          <label>Total </label>
          <span>{getLength()}</span>
        </Wrap>
        <Wrap>
          <FcHighPriority />
          <label>Priority </label>
          <span>{getLength()}</span>
        </Wrap>
        <Wrap>
          <MdOutlineDoneOutline style={{ color: "green" }} />
          <label>Done </label>
          <span>{getLength()}</span>
        </Wrap>
        <Wrap>
          <CgDanger style={{ color: "orange" }} />
          <label>Overdue </label>
          <span>{getLength()}</span>
        </Wrap>
      </Content>
    </Container>
  );
}

const Container = styled.section`
  width: 30rem;
  height: 35rem;
  background-color: rgb(57, 62, 70);
  border-radius: 15px;
  font-family: "Roboto";
  color: white;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 15px;
  padding: 20px;
  font-size: 20px;
  text-transform: uppercase;
  border: 2px solid #eeeeee;
  border-radius: 5px;
  width: 250px;
  margin-bottom: 10px;

  svg {
    font-size: 25px;
  }
`;

export default Overview;
