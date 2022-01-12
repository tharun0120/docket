import { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Tasks from "./Tasks.jsx";
import AddTask from "./AddTask.jsx";
import {
  selectTasks,
  getTasks,
  searchTasks,
  getSingleTask,
  // clearTaskState,
} from "../app/taskSlice";
import { FiSearch } from "react-icons/fi";

const TaskBar = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const dispatch = useDispatch();
  const { searchString } = useSelector(selectTasks);
  const [searchQuery, setSearchQuery] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setSearchQuery(searchString);
  }, [searchString]);

  // useEffect(() => {
  //   return () => {
  //     dispatch(clearTaskState());
  //   };
  // }, []); //eslint-disable-line

  const onAddTask = () => {
    setShowAddTask(!showAddTask);
  };

  const sortTask = (e) => {
    // console.log(e.target.value);
    if (e.target.value === "all") {
      dispatch(getTasks());
      return;
    }
    if (e.target.value === "priority") {
      dispatch(getTasks("priorotize=true"));
      return;
    }
    if (e.target.value === "completed") {
      dispatch(getTasks("completed=true"));
      return;
    }
    if (e.target.value === "pending") {
      dispatch(getTasks("completed=false"));
      return;
    }
  };

  const search = (e) => {
    setSearchText(e.target.value);
    if (e.target.value.length > 1) {
      dispatch(searchTasks({ params: `query=${e.target.value}` }));
    }
  };

  const setTask = (task) => {
    setSearchText("");
    setSearchQuery([]);
    dispatch(getSingleTask({ id: task._id }));
  };

  return (
    <Container>
      <SecondaryHeader>
        <AddButton onClick={onAddTask}>Add Task</AddButton>
        <SearchBar>
          <FiSearch style={{ float: "left" }} />
          <input type="search" onChange={(e) => search(e)} value={searchText} />
          <AutoComplete>
            {searchQuery?.map((search) => {
              return (
                <div key={search?._id} onClick={() => setTask(search)}>
                  {search?.title}
                </div>
              );
            })}
          </AutoComplete>
        </SearchBar>
        <SortBar>
          <select name="sortBy" id="sortBy" onChange={(e) => sortTask(e)}>
            <option value="default">Sort By</option>
            <option value="all">All</option>
            <option value="priority">Priority</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </SortBar>
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
  justify-content: space-between;
  align-items: center;
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

const SearchBar = styled.div`
  position: relative;
  display: inline-block;
  input {
    min-width: 22rem;
    height: 40px;
    padding: 0px 10px;
    font-size: 16px;
    background-color: rgb(34, 40, 49);
    color: #eeeeee;
    border: 0px;
    /* border-radius: 4px; */
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    transition: all 250ms ease-in-out;
  }
  svg {
    height: 40px;
    padding: 0px 10px;
    font-size: 16px;
    background-color: rgb(34, 40, 49);
    color: #eeeeee;
    border: 0;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
  input:focus {
    outline: none;
  }
`;

const AutoComplete = styled.div`
  position: absolute;
  border-bottom: none;
  border-top: none;
  z-index: 99;
  top: 100%;
  left: 0;
  right: 0;

  div {
    padding: 10px;
    cursor: pointer;
    background-color: #fff;
    border-bottom: 1px solid #d4d4d4;

    &:hover {
      background-color: #e9e9e9;
    }

    /*when navigating through the items using the arrow keys:*/
    &:active {
      background-color: rgb(34, 40, 49) !important;
      color: #eeeeee;
    }
  }
`;

const SortBar = styled.div`
  select {
    height: 40px;
    padding: 0px 20px;
    font-size: 20px;
    margin-right: 20px;
    border-radius: 8px;
    border: 0;
    outline: none;

    option {
      border-bottom: 2px solid rgb(57, 62, 70);
      outline: none;
    }
  }
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
