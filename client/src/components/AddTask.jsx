import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker"; //eslint-disable-line
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { SubmitButton } from "./Login";
import { createTask, selectTasks, clearTaskState } from "../app/taskSlice";

const AddTask = ({ addTask, setShowAddTask }) => {
  const dispatch = useDispatch();
  const [description, setDesciption] = useState("");
  const [deadline, setDeadline] = useState("");
  const [important, setImportant] = useState();
  const { isSuccess, isError, error } = useSelector(selectTasks);
  // const [showAddTask, setShowAddTask] = useState(addTask);
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (isError) {
      toast.error(error);
      dispatch(clearTaskState());
      return;
    }
  }, [isError]); //eslint-disable-line

  const setTask = () => {
    const task = {
      title,
      description,
      deadline,
      priorotize: important,
    };
    dispatch(createTask(task));
    if (isSuccess) {
      toast.success("Task Added!");
      // setShowAddTask(!showAddTask);
      setShowAddTask(!addTask);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!description) {
      toast.warn("Please enter a Description");
      return;
    }
    if (!deadline) {
      toast.warn("Please enter a Deadline");
      return;
    }
    setTask();
    setDesciption("");
    setDeadline("");
    setImportant(false);
  };
  return (
    addTask && (
      <Container>
        <Wrap>
          <label htmlFor="task">Task</label>
          <input
            name="task"
            type="text"
            placeholder="Task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Wrap>
        <Wrap>
          <label htmlFor="description">Description</label>
          <input
            name="description"
            type="text"
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDesciption(e.target.value)}
          />
        </Wrap>
        <Wrap>
          <label htmlFor="Deadline">Deadline</label>
          <input
            name="deadline"
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
          {/* <DatePicker
              required
              selected={deadline}
              onChange={(date) => setDeadline(date)}
              showTimeSelect
              dateFormat="Pp"
              minDate={new Date()}
              placeholderText="Deadline"
            /> */}
        </Wrap>
        <Wrap>
          <label htmlFor="priority">Prioritize</label>
          <input
            name="priority"
            type="checkbox"
            value={important}
            onChange={(e) => setImportant(e.target.checked)}
          />
        </Wrap>
        <SubmitButton style={{ padding: "0 15px 15px 15px" }}>
          <input type="submit" value="ADD" onClick={onSubmit} />
        </SubmitButton>
      </Container>
    )
  );
};

const Container = styled.div`
  letter-spacing: 1.2px;
  padding: 0px 15px;
  font-size: 28px;
  font-family: "Montserrat", sans-serif;
  border-radius: 15px;
  background: #eee;
  text-align: center;
  padding-top: -10px;
`;

const Wrap = styled.div`
  display: grid;
  gap: 0;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: center;
  justify-items: start;
  padding: 20px;
  padding-bottom: 15px;

  input {
    margin-top: 10px;
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
      /* box-shadow: 0px 0px 12px 0.8px #0281ce96; */
    }
  }
`;

export { Wrap };

export default AddTask;
