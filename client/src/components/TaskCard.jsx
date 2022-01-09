import React, { useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import styled from "styled-components";
import moment from "moment";
import ReactTooltip from "react-tooltip";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTasks,
  deleteTask,
  updateTask,
  clearTaskState,
} from "../app/taskSlice";
import { selectUser, updateUser } from "../app/userSlice";
import { toast } from "react-toastify";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { GrUpgrade } from "react-icons/gr";
import { AiOutlineDownCircle } from "react-icons/ai";

const TaskCard = ({ id, date }) => {
  const { tasks, isSuccess, isError, error } = useSelector(selectTasks);
  const { user } = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.warn(error);
      dispatch(clearTaskState());
      return;
    }
  }, [isError]); //eslint-disable-line

  const onDelete = (task) => {
    dispatch(deleteTask(task));
    if (isSuccess) {
      toast.success("Task Deleted!");
      return;
    }
  };

  const getDeadline = (deadline) => {
    // const res = new Date(deadline);
    // const time = res.toLocaleTimeString();
    return moment(deadline).format("LT");
  };

  const makePriority = (task) => {
    const taskToUpdate = {
      id: task._id,
      completed: task.completed,
      priorotize: !task.priorotize,
    };
    dispatch(updateTask(taskToUpdate));
  };

  const makeCompleted = (task) => {
    const taskToUpdate = {
      id: task._id,
      completed: !task.completed,
      important: task.priorotize,
    };
    dispatch(updateTask(taskToUpdate));
    const deadline = moment(task.deadline).unix();
    const currentTime = moment().unix();
    if (deadline > currentTime)
      dispatch(updateUser({ streak: user.streak + 1 }));
    else if (user.streak > 0) dispatch(updateUser({ streak: 0 }));
  };

  return tasks[date].map((task) => {
    return (
      task._id === id.toString() && (
        <Container key={task._id}>
          <h2
            style={{
              fontFamily: "Open Sans",
              fontWeight: "700",
              fontSize: "25px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              paddingBottom: "-5px",
            }}>
            <span style={{ display: "flex", alignItems: "center" }}>
              {!task.completed ? (
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    cursor: "pointer",
                    border: `${
                      !task.priorotize ? "5px solid black" : "5px solid red"
                    }`,
                    borderRadius: "50%",
                    marginRight: "10px",
                  }}
                  onClick={() => makeCompleted(task)}
                  data-tip="mark complete"></div>
              ) : (
                <IoCheckmarkDoneCircle
                  style={{
                    color: "green",
                    fontSize: "25px",
                    marginRight: "10px",
                  }}
                  data-tip="completed"
                />
              )}
              {task.title}
            </span>
            <FaTrash
              style={{ color: "red", cursor: "pointer" }}
              onClick={() => onDelete(task)}
              data-tip="delete"
            />
          </h2>
          <p style={{ color: "#222831", fontSize: "18px", marginTop: "-10px" }}>
            {task.description}
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}>
            <span
              style={{
                backgroundColor: "orange",
                color: "#393E46",
                border: "3px solid black",
                padding: "5px",
                borderRadius: "4px",
                fontWeight: "600",
              }}
              data-tip="deadline">
              {getDeadline(task.deadline)}
            </span>
            {!task.priorotize ? (
              <GrUpgrade
                style={{ fontSize: "35px", cursor: "pointer" }}
                onClick={() => makePriority(task)}
                data-tip="prioritize"
              />
            ) : (
              <AiOutlineDownCircle
                style={{ fontSize: "35px", cursor: "pointer" }}
                onClick={() => makePriority(task)}
                data-tip="de-prioritize"
              />
            )}
          </div>
          <ReactTooltip place="bottom" />
        </Container>
      )
    );
  });
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  padding-left: 10px;
  padding-bottom: 10px;
  margin: 0px 20px;
  margin-bottom: 10px;
  border-bottom: 5px solid rgb(34, 40, 49);
`;

export default TaskCard;
