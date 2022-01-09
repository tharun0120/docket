import { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Tasks from "./Tasks.jsx";
import AddTask from "./AddTask.jsx";
import { selectTasks } from "../app/taskSlice";

const TaskBar = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const { tasks } = useSelector(selectTasks);

  const onAddTask = () => {
    setShowAddTask(!showAddTask);
  };

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
      <SecondaryHeader>
        <AddButton onClick={onAddTask}>Add Task</AddButton>
        <TaskCount>Total Tasks : {getLength()}</TaskCount>
      </SecondaryHeader>
      {showAddTask ? (
        <AddTask addTask={showAddTask} setShowAddTask={setShowAddTask} />
      ) : (
        <TaskContainer>
          <Tasks />
        </TaskContainer>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 500px;
  padding: 15px;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const SecondaryHeader = styled.div`
  border: 1px solid red;
  height: 5rem;
  width: 55em;
  display: flex;
  border-radius: 9px;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(
    120deg,
    rgba(255, 99, 72, 1) 21%,
    rgba(255, 22, 22, 1) 100%
  );
  font-family: "Montserrat", sans-serif;
`;

const AddButton = styled.button`
  padding: 10px 18px;
  margin: 15px;
  border: none;
  border-radius: 15px;
  font-size: 26px;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;

  &:hover {
    /* background: transparent;
    color: white; */
    border: transparent;
    outline: none;
  }

  &:focus {
    /* background: transparent;
    color: white; */
    border: transparent;
    outline: none;
  }
`;

const TaskCount = styled.p`
  padding: 18px 24px;
  margin: 15px;
  border: none;
  font-size: 26px;
  background-color: transparent;
  color: #eeeeee;
`;

const TaskContainer = styled.section`
  overflow-y: scroll;
  padding: 0 50px;
  &::-webkit-scrollbar {
    width: 15px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: black;
  }

  & {
    scrollbar-color: transparent transparent;
    scrollbar-width: thin;
  }
`;

export default TaskBar;
