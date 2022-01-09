import React, { useEffect } from "react";
import styled from "styled-components";
import moment from "moment";
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

  useEffect(() => {}, [user, tasks]);

  const getLength = () => {
    const keys = Object.keys(tasks);
    let count = 0;
    keys.forEach((date) => {
      count += tasks[date].length;
    });
    return count;
  };

  const getPriorityLength = () => {
    const keys = Object.keys(tasks);
    let count = 0;
    keys.forEach((date) => {
      tasks[date].forEach((task) => {
        if (!task.completed) if (task.priorotize) count += 1;
      });
    });
    return count;
  };

  const getCompletedLength = () => {
    const keys = Object.keys(tasks);
    let count = 0;
    keys.forEach((date) => {
      tasks[date].forEach((task) => {
        if (task.completed) count += 1;
      });
    });
    return count;
  };

  const getOverdueLength = () => {
    const keys = Object.keys(tasks);
    let count = 0;
    const currentTime = moment().unix();
    keys.forEach((date) => {
      tasks[date].forEach((task) => {
        const deadline = moment(task.deadline).unix();
        if (!task.completed) if (deadline < currentTime) count += 1;
      });
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
          <span>{getPriorityLength()}</span>
        </Wrap>
        <Wrap>
          <MdOutlineDoneOutline style={{ color: "green" }} />
          <label>Done </label>
          <span>{getCompletedLength()}</span>
        </Wrap>
        <Wrap>
          <CgDanger style={{ color: "orange" }} />
          <label>Overdue </label>
          <span>{getOverdueLength()}</span>
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
