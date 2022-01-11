import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import TaskClass from "../core/Tasks";

const initialState = {
  tasks: [],
  allTasks: [],
  isFetching: false,
  isSuccess: false,
  isError: false,
  error: [],
  serachString: [],
};

const task = new TaskClass();

const createTask = createAsyncThunk("/api/createTask", (tasks, thunkAPI) => {
  return new Promise(async (resolve, reject) => {
    await task
      .createTask(tasks)
      .then((tasks) => resolve(tasks))
      .catch((error) => {
        reject(thunkAPI.rejectWithValue(error));
      });
  });
});

const getTasks = createAsyncThunk("/api/getTasks", (params = "", thunkAPI) => {
  return new Promise(async (resolve, reject) => {
    await task
      .getTasks(params)
      .then((tasks) => resolve(tasks))
      .catch((error) => reject(error));
  });
});

const deleteTask = createAsyncThunk("/api/tasks", (tasks, thunkAPI) => {
  return new Promise(async (resolve, reject) => {
    await task
      .deleteTasks(tasks)
      .then((deletedTask) => resolve(deletedTask))
      .catch((error) => reject(thunkAPI.rejectWithValue(error)));
  });
});

const searchTasks = createAsyncThunk("/api/searchTasks", (params, thunkAPI) => {
  return new Promise(async (resolve, reject) => {
    await task
      .searchTasks(params)
      .then((tasks) => resolve(tasks))
      .catch((error) => reject(error));
  });
});

const updateTask = createAsyncThunk(
  "/api/updateTask",
  (taskToUpdate, thunkAPI) => {
    return new Promise(async (resolve, reject) => {
      await task
        .updateTask(taskToUpdate)
        .then((updatedTasks) => resolve(updatedTasks))
        .catch((error) => reject(thunkAPI.rejectWithValue(error)));
    });
  }
);

const getSingleTask = createAsyncThunk("/api/getSingleTask", (id, thunkAPI) => {
  return new Promise(async (resolve, reject) => {
    await task
      .getSingleTask(id)
      .then((tasks) => resolve(tasks))
      .catch((error) => reject(error));
  });
});

const getAllTasks = createAsyncThunk(
  "/api/getAllTasks",
  (params = "", thunkAPI) => {
    return new Promise(async (resolve, reject) => {
      await task
        .getTasks(params)
        .then((tasks) => resolve(tasks))
        .catch((error) => reject(error));
    });
  }
);

const taskSlice = createSlice({
  name: "taskState",
  initialState,
  reducers: {
    clearTaskState: (state) => {
      state.tasks = [];
      state.allTasks = [];
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = false;
      state.error = [];
      state.searchString = [];
    },
  },
  extraReducers: {
    //createTask
    [createTask.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [createTask.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      const date = payload.deadline.slice(0, 10);
      if (!state.tasks.hasOwnProperty(date)) {
        state.tasks[date] = [payload];
      } else {
        state.tasks[date].push(payload);
      }
    },
    [createTask.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.error = payload;
    },
    //getTasks
    [getTasks.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [getTasks.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.tasks = payload;
      // console.log(payload.tasks);
    },
    [getTasks.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.error = payload;
    },
    //deleteTasks
    [deleteTask.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [deleteTask.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      const date = payload.deadline.slice(0, 10);
      state.tasks[date] = state.tasks[date].filter((task) => {
        return task._id !== payload._id;
      });
      if (state.tasks[date].length === 0) delete state.tasks[date];
    },
    [deleteTask.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.error = payload;
    },
    //updateTask
    [updateTask.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [updateTask.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      const date = payload.deadline.slice(0, 10);
      state.tasks[date] = state.tasks[date].map((task) => {
        if (task._id === payload._id) return payload;
        else return task;
      });
    },
    [updateTask.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.error = payload;
    },
    //search
    [searchTasks.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [searchTasks.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.searchString = payload;
      // payload.forEach((element) => {
      //   state.searchString.push(element.title);
      // });
    },
    [searchTasks.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.error = payload;
    },
    //get single task
    [getSingleTask.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [getSingleTask.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.tasks = payload;
      // console.log(payload.tasks);
    },
    [getSingleTask.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.error = payload;
    },
    //get all tasks
    [getAllTasks.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [getAllTasks.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.allTasks = payload;
      // console.log(payload.tasks);
    },
    [getAllTasks.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.error = payload;
    },
  },
});

export {
  createTask,
  getTasks,
  deleteTask,
  updateTask,
  searchTasks,
  getSingleTask,
  getAllTasks,
};

export const { clearTaskState } = taskSlice.actions;

export const selectTasks = (state) => state.taskState;

export default taskSlice.reducer;
