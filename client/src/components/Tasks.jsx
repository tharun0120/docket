import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import TaskCard from "./TaskCard";
import { toast } from "react-toastify";
import moment from "moment";
import { getTasks, selectTasks, clearTaskState } from "../app/taskSlice";

const Tasks = () => {
  const dispatch = useDispatch();
  const { tasks, isSuccess, isError, error } = useSelector(selectTasks);
  const dateInTasks = Object.keys(tasks);
  dateInTasks.sort(function (a, b) {
    return new Date(a).getTime() / 1000 - new Date(b).getTime() / 1000;
  });
  // console.log(dateInTasks);

  useEffect(() => {
    dispatch(getTasks());
  }, []); //eslint-disable-line

  useEffect(() => {
    if (tasks.length > 0) {
      toast.success("Tasks Fetched!");
    }
    if (isError) {
      toast.error(error);
      dispatch(clearTaskState());
      return;
    }
  }, [isSuccess, isError]); //eslint-disable-line

  const formatDate = (dateToBeFormatted) => {
    // console.log(new Date(dateToBeFormatted).getTime() / 1000);
    return moment(dateToBeFormatted).format("MMMM Do YYYY");
  };

  return dateInTasks.map((date) => {
    return (
      <Container key={date}>
        <Card>
          <CardHeader>
            <ShowDate>{formatDate(date)}</ShowDate>
          </CardHeader>
          {tasks[date].map((task) => {
            return (
              <div key={task._id}>
                <TaskCard id={task._id} date={date} />
              </div>
            );
          })}
        </Card>
      </Container>
    );
  });
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "Montserrat", sans-serif;
  margin-top: 30px;
  margin-bottom: 30px;
  padding-bottom: 50px;
  /* transition: 1s;

  &:hover {
    transform: scale(1.3);
    background: #ff800a;
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
      rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    z-index: 2;
  } */
`;

const Card = styled.div`
  display: grid;
  grid-template-columns: 45rem;
  grid-template-rows: 100px;
  grid-template-areas: "card-header";
  font-family: "Montserrat", sans-serif;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
  background: white;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  text-align: center;
  position: relative;
  padding-bottom: 10px;
  /* transition: 1s;

  &:hover {
    transform: scale(1.3);
    background: #ff800a;
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
      rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    z-index: 2;
  } */
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  grid-area: card-header;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
  background: rgb(255, 99, 72);
  background: linear-gradient(
    120deg,
    rgba(255, 99, 72, 1) 21%,
    rgba(255, 22, 22, 1) 100%
  );
  color: white;
  font-size: 38px;
`;

const ShowDate = styled.span`
  margin: 0;
  padding: 18px 24px;
  position: relative;
  color: black;
`;

export default Tasks;
